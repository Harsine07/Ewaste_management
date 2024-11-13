import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AgentList = () => {
  const [agents, setAgents] = useState([]);

  // Fetch agents from the backend when the component mounts
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/agents/'); // Correct API endpoint
        setAgents(response.data); // Setting the data fetched from the backend
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    fetchAgents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); // Format to 'MM/DD/YYYY'
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-5xl font-semibold text-center mb-8 text-gray-900">Agent List</h1>

      <div className="mb-8 flex justify-end">
        <Link to="/add-agent">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-300 text-lg">
            Add Agent
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-200">
        <table className="min-w-full table-auto text-base text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left text-center font-medium text-gray-600 text-lg">ID</th>
              <th className="py-4 px-6 text-left text-center font-medium text-gray-600 text-lg">Name</th>
              <th className="py-4 px-6 text-left text-center font-medium text-gray-600 text-lg">Age</th>
              <th className="py-4 px-6 text-left text-center font-medium text-gray-600 text-lg">DOJ</th>
              <th className="py-4 px-6 text-left text-center font-medium text-gray-600 text-lg">Email</th>
              <th className="py-4 px-6 text-left text-center font-medium text-gray-600 text-lg">Phone</th>
            </tr>
          </thead>
          <tbody>
            {agents.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500 text-lg">
                  No agents found
                </td>
              </tr>
            ) : (
              agents.map((agent) => (
                <tr key={agent.agent_id} className="hover:bg-gray-50 transition duration-200">
                  <td className="py-4 px-6 border-b text-center text-lg">{agent.agent_id}</td>
                  <td className="py-4 px-6 border-b text-center text-lg">{agent.name}</td>
                  <td className="py-4 px-6 border-b text-center text-lg">{agent.age}</td>
                  <td className="py-4 px-6 border-b text-center text-lg">{formatDate(agent.doj)}</td>
                  <td className="py-4 px-6 border-b text-center text-lg">{agent.email}</td>
                  <td className="py-4 px-6 border-b text-center text-lg">{agent.phone}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentList;
