// agentsRoutes.js
import express from 'express';
import { pool } from '../db.js';  // Correct import for database connection

const router = express.Router();

// Enable CORS for all routes
import cors from 'cors';
router.use(cors());

// POST request for adding a new agent
router.post('/add-agent', async (req, res) => {
  const { agentId, name, gender, age, email, phone, doj } = req.body;

  // Log the incoming request for debugging
  

  // Validate required fields
  if (!agentId || !name || !gender || !age || !email || !phone || !doj) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Check if the email already exists
    const existingAgent = await pool.query('SELECT * FROM agents WHERE email = $1', [email]);
    if (existingAgent.rows.length > 0) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    // SQL query to insert data into the agents table
    const result = await pool.query(
      'INSERT INTO agents (agent_id, name, gender, age, email, phone, doj) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [agentId, name, gender, age, email, phone, doj]
    );

    // Successful insertion response
    res.status(201).json({
      success: true,
      message: 'Agent added successfully!',
      agent: result.rows[0],  // Return the newly added agent's details
    });
  } catch (error) {
    console.error('Error during agent registration:', error);

    // Handle specific errors (e.g., database issues, constraint violations)
    if (error.code === '23505') {
      return res.status(409).json({ success: false, message: 'Email already exists.' });
    }

    // Catch-all for server errors
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM agents');
    res.status(200).json(result.rows); // Sending back the agent data as a JSON response
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;
