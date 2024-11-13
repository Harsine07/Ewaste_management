import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignedOrders = () => {
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [ordersWithAgentNames, setOrdersWithAgentNames] = useState([]);

  useEffect(() => {
    const fetchAssignedOrders = async () => {
      try {
        // Fetch assigned orders
        const response = await axios.get('http://localhost:5000/api/place-order?assigned=true');
        const orders = response.data;

        // Fetch agent names for each order based on order_id in assigned_orders
        const ordersWithAgents = await Promise.all(
          orders.map(async (order) => {
            const assignedOrderResponse = await axios.get(
              `http://localhost:5000/api/assigned-orders/${order.id}`
            );
            const assignedOrder = assignedOrderResponse.data;
            return { ...order, agent_name: assignedOrder.agent_name };
          })
        );

        setOrdersWithAgentNames(ordersWithAgents);
      } catch (error) {
        console.error('Error fetching assigned orders:', error);
      }
    };

    fetchAssignedOrders();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-semibold text-indigo-700 mb-8">Assigned Orders</h1>
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {ordersWithAgentNames.map((order) => (
          <div
            key={order.id}
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800">Order ID: {order.id}</h3> {/* Decreased font size */}
            <div className="mt-4 mb-6">
              <h4 className="text-lg font-semibold text-gray-600">Assigned to:</h4> {/* Decreased font size */}
              <p className={`text-lg ${order.agent_name ? 'text-green-600' : 'text-red-600'}`}>
                {order.agent_name || 'Unassigned'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-600">Items:</h4>
              <ul className="list-disc list-inside mt-2">
                {order.items.map((item, index) => (
                  <li key={index} className="text-base text-gray-700"> {/* Increased font size for items */}
                    {item.itemName}: <span className="font-semibold">{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedOrders;
