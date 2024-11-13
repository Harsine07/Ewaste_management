import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

// Post route to handle placing an order
router.post('/place-order', async (req, res) => {
  const { orderDate, items, company } = req.body;

  if (!orderDate || !items || !company) {
    return res.status(400).json({ message: 'Missing required order fields' });
  }

  try {
    // Store the order in the database
    const result = await pool.query(
      'INSERT INTO orders (order_date, company, items) VALUES ($1, $2, $3) RETURNING id',
      [orderDate, company, JSON.stringify(items)] // Store items as a JSON string
    );

    const orderId = result.rows[0].id;

    res.status(201).json({ message: 'Order placed successfully!', orderId });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/place-order', async (req, res) => {
  const { assigned } = req.query;

  try {
    let query = 'SELECT * FROM orders';
    let values = [];

    if (assigned === 'true') {
      query += ' WHERE assigned = true'; // Only fetch orders where assigned is true
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }

});


router.put('/place-order/:orderId/status', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    await pool.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      [status, orderId]
    );
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Failed to update order status' });
  }
});


router.get('/completed-orders', async (req, res) => {
  try {
    // Query to fetch orders with status 'Completed'
    const completedOrdersQuery = `
      SELECT id, order_date, company, items
      FROM orders
      WHERE status = 'Completed';
    `;
    
    const result = await pool.query(completedOrdersQuery);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching completed orders:', error);
    res.status(500).json({ message: 'Failed to retrieve completed orders' });
  }
});



// Export the router for use in the main server file
export default router;
