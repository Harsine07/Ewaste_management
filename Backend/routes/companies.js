import express from 'express';
import bcrypt from 'bcryptjs';
import { pool } from '../db.js'; // Ensure this path is correct

const router = express.Router();

// POST request for user registration
router.post('/', async (req, res) => {
  const { companyName, email, password, address, contactNumber } = req.body;

  try {
    // Validate required fields
    if (!companyName || !email || !password || !address || !contactNumber) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

     // **Check if email already exists in the database**
     const existingCompany = await db.query('SELECT * FROM companies WHERE email = $1', [email]);

     // **If email exists, send a 409 Conflict response**
     if (existingCompany.rows.length > 0) {
       return res.status(409).json({ message: 'Email ID already exists' }); // 409 Conflict status code
     }

    // SQL query to insert data into the database
    const result = await pool.query(
      'INSERT INTO companies (company_name, email, password, address, contact_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [companyName, email, hashedPassword, address, contactNumber]
    );

    // Successful insertion response
    res.status(201).json({
      success: true,
      message: 'Company registered successfully!',
      company: result.rows[0],
    });
  } catch (error) {
    console.error('Error during registration:', error);

    // Error handling for duplicate emails
    if (error.code === '23505') { // PostgreSQL unique violation code
      return res.status(409).json({ success: false, message: 'Email already exists.' });
    }

    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

export default router;
