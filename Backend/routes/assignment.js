import express from 'express';
import { pool } from '../db.js'; // Assuming you have a db.js for your database connection

const router = express.Router();

// Fetch unassigned orders
router.get('/unassigned-orders', async (req, res) => {
  try {
    // Query to find orders that are not yet assigned (assigned = false)
    const query = `
      SELECT * 
      FROM orders 
      WHERE assigned = false
    `;
    
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.json(result.rows); // Send the unassigned orders to the frontend
    } else {
      res.status(404).json({ message: 'No unassigned orders found' });
    }
  } catch (error) {
    console.error('Error fetching unassigned orders:', error);
    res.status(500).json({ message: 'Failed to fetch unassigned orders' });
  }
});

// Fetch assigned orders
router.get('/assigned-orders', async (req, res) => {
  try {
    // Query to fetch all orders that are assigned (assigned = true)
    const query = `
      SELECT * 
      FROM orders 
      WHERE assigned = true
    `;
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      res.json(result.rows); // Send the assigned orders to the frontend
    } else {
      res.status(404).json({ message: 'No assigned orders found' });
    }
  } catch (error) {
    console.error('Error fetching assigned orders:', error);
    res.status(500).json({ message: 'Failed to fetch assigned orders' });
  }
});

// Fetch order details by orderId with agent name
router.get('/assigned-orders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Query to fetch order details with agent_name from assigned_orders
    const query = `
      SELECT o.id, o.items, ao.agent_name 
      FROM orders o
      LEFT JOIN assigned_orders ao ON o.id = ao.order_id
      WHERE o.id = $1
    `;

    const result = await pool.query(query, [orderId]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Send the order and agent details to the frontend
    } else {
      res.status(404).json({ message: 'Order or agent not found' });
    }
  } catch (error) {
    console.error('Error fetching assigned order with agent name:', error);
    res.status(500).json({ message: 'Failed to fetch assigned order with agent name' });
  }
});

// Fetch assigned orders by agentId
router.get('/assigned-orders/agent/:agentId', async (req, res) => {
  const { agentId } = req.params;
  console.log('Fetching assigned orders for agentId:', agentId);

  try {
    // Query to fetch orders assigned to the specific agent
    const query = `
      SELECT ao.order_id, ao.agent_name, o.items
      FROM assigned_orders ao
      JOIN orders o ON ao.order_id = o.id
      WHERE ao.agent_id = $1
    `;
    
    const result = await pool.query(query, [agentId]);

    if (result.rows.length > 0) {
      res.json(result.rows); // Send the assigned orders to the frontend
    } else {
      res.status(404).json({ message: 'No assigned orders found for this agent' });
    }
  } catch (error) {
    console.error('Error fetching assigned orders for agent:', error);
    res.status(500).json({ message: 'Failed to fetch assigned orders' });
  }
});

// Assign an order to an agent
router.post('/assign-order', async (req, res) => {
  const { orderId, agentId, agentName } = req.body;
  console.log('Received data:', req.body);

  if (!orderId || !agentId || !agentName) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Check if the order exists and is unassigned
    const checkOrder = await pool.query('SELECT assigned FROM orders WHERE id = $1', [orderId]);
    if (checkOrder.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    if (checkOrder.rows[0].assigned) {
      return res.status(400).json({ success: false, message: 'Order already assigned' });
    }

    // Insert the assigned order details into the 'assigned_orders' table
    const insertAssignedOrderQuery = `
      INSERT INTO assigned_orders (order_id, agent_id, agent_name)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const insertValues = [orderId, agentId, agentName];
    const insertResult = await pool.query(insertAssignedOrderQuery, insertValues);

    // Update the 'assigned' status in the 'orders' table to true
    const updateOrderQuery = `
    UPDATE orders 
    SET assigned = true, status = 'Assigned'
    WHERE id = $1 
    RETURNING *;
  `;

    const updateResult = await pool.query(updateOrderQuery, [orderId]);

    if (insertResult.rows.length > 0 && updateResult.rows.length > 0) {
      return res.status(200).json({ success: true, message: 'Order assigned successfully' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to assign order' });
    }
  } catch (error) {
    console.error('Error assigning order:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
