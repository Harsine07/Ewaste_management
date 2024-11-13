import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// POST route for customer registration
router.post('/register', async (req, res) => {
  const { name, email, password, address, contactNumber, landmark, customerType, timeAvailability } = req.body;

  try {
    // Insert the customer data into the 'customers' table
    const result = await pool.query(
      `INSERT INTO customers (name, email, password, address, contact_number, landmark, customer_type, time_availability)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, email, password, address, contactNumber, landmark, customerType, timeAvailability]
    );

    // Return success message with customer data
    res.status(201).json({
      message: 'Registration successful',
      customer: result.rows[0], // Return the newly created customer data
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
