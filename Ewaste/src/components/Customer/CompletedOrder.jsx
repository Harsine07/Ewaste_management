import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Date formatting function to display date as 'MM/DD/YYYY'
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US'); // Format to 'MM/DD/YYYY'
};

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/completed-orders');
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching completed orders');
        console.error('Error fetching completed orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedOrders();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Completed Orders</h1>

      {loading && <div className="text-lg text-gray-500">Loading completed orders...</div>}
      {error && <div className="text-lg text-red-500 mb-4">{error}</div>}

      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-3 px-4 font-medium">Order ID</th>
              <th className="py-3 px-4 font-medium">Order Date</th>
              <th className="py-3 px-4 font-medium">Company</th>
              <th className="py-3 px-4 font-medium">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{formatDate(order.order_date)}</td>
                  <td className="py-3 px-4">{order.company}</td>
                  <td className="py-3 px-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm text-gray-700">
                        {item.itemName} - {item.quantity}
                      </div>
                    ))}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-lg text-gray-500">
                  No completed orders available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedOrders;
