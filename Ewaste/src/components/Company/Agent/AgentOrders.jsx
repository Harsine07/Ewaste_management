import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgentOrders = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: to track loading status

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      // Retrieve the logged-in agent's ID from localStorage
      const agentId = localStorage.getItem('agentId');
      console.log("Logged in Agent ID:", agentId);

      if (!agentId) {
        console.error('Agent ID not found');
        return;
      }

      try {
        // Fetch orders assigned to the logged-in agent
        const response = await axios.get(
          `http://localhost:5000/api/assigned-orders/agent/${agentId}`
        );

        const orders = response.data;

        setAssignedOrders(orders);
      } catch (error) {
        console.error('Error fetching assigned orders:', error);
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchAssignedOrders();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Assigned Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-lg">
          {assignedOrders.length > 0 ? (
            assignedOrders.map((order) => (
              <div key={order.order_id} className="p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold">Order ID: {order.order_id}</h3>
                <div className="mb-4">
                  <h4 className="font-semibold">Assigned to: {order.agent_name}</h4>
                  <ul className="list-disc list-inside">
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
                </div>
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

export default AgentOrders;
