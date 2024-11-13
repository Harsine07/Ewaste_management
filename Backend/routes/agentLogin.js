// loginRoute.js
import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, agent_id } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM agents WHERE email = $1 AND agent_id = $2',
      [email, agent_id]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', agent: result.rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid email or agent ID' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
