import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDone = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      const agentId = localStorage.getItem('agentId');
      if (!agentId) {
        console.error('Agent ID not found');
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/assigned-orders/agent/${agentId}`
        );
        setAssignedOrders(response.data); // The data should include each order's status
      } catch (error) {
        console.error('Error fetching assigned orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedOrders();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Orders Completed</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-lg">
          {assignedOrders.length > 0 ? (
            assignedOrders.map((order) => (
              <div key={order.order_id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">Order ID: {order.order_id}</h3>
                <ul className="list-disc list-inside mb-4">
                  {order.items ? (
                    order.items.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        {item.itemName}: {item.quantity}
                      </li>
                    ))
                  ) : (
                    <li>No items assigned.</li>
                  )}
                </ul>
                {order.status === 'Completed' && (
                  <p className="text-green-600 font-semibold">Status: {order.status}</p>
                )}
              </div>
            ))
          ) : (
            <p>No orders assigned to you at the moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDone;
