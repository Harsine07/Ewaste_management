import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderAssignments = () => {
  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({ agentId: '', agentName: '' });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/unassigned-orders');
        setOrders(response.data);
      } catch (error) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', error);
      }
    };

    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents');
        setAgents(response.data);
      } catch (error) {
        setError('Error fetching agents');
        console.error('Error fetching agents:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchOrders();
    fetchAgents();
  }, []);

  const handleAssignAgent = async (orderId) => {
    const { agentId, agentName } = selectedAgent;

    if (!agentId || !agentName) {
      console.error('Agent or Agent Name is missing');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/assign-order', {
        orderId,
        agentId,
        agentName,
      });

      if (response.data.success) {
        setOrders(orders.filter(order => order.id !== orderId)); // Remove assigned order from the list
        navigate('/view-orders'); // Redirect to the assigned orders page
      }
    } catch (error) {
      console.error('Error assigning order:', error);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Order Assignments</h1>

      {loading && <div className="text-lg text-gray-500">Loading orders and agents...</div>}
      {error && <div className="text-lg text-red-500 mb-4">{error}</div>}

      <div className="flex flex-col gap-6 w-full max-w-xl">
        {orders.map((order) => (
          <div key={order.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-800">Order ID: {order.id}</h3>
            <div className="mt-2 mb-4">
              <h4 className="text-lg font-semibold text-gray-600">Order Details:</h4>
              <ul className="list-disc list-inside mt-1">
                {order.items.map((item, index) => (
                  <li key={index} className="text-sm text-gray-700">{item.itemName}: {item.quantity}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <select
                onChange={(e) => {
                  const [agentId, agentName] = e.target.value.split('-');
                  setSelectedAgent({ agentId, agentName });
                }}
                defaultValue=""
                className="w-full sm:w-56 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>Select Agent</option>
                {agents.map((agent) => (
                  <option key={agent.agent_id} value={`${agent.agent_id}-${agent.name}`}>
                    {agent.agent_id} - {agent.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAssignAgent(order.id)}
                className="w-full sm:w-auto mt-3 sm:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Assign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderAssignments;
