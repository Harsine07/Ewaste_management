import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const AddAgent = () => {
  const navigate = useNavigate(); // hook to navigate programmatically
  const [newAgent, setNewAgent] = useState({
    agentId: '',
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
    doj: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAgent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the new agent data to the backend
      const response = await axios.post('${API_BASE_URL}/api/agents/add-agent', newAgent);
      
      // On success, navigate to the agent list page (or another page as needed)
      console.log('Agent added:', response.data.agent);
      navigate('/');
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add New Agent</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* Agent ID Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Agent ID</label>
          <input
            type="text"
            name="agentId"
            value={newAgent.agentId}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={newAgent.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Gender Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={newAgent.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Age Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={newAgent.age}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={newAgent.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={newAgent.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date of Joining (DOJ) Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date of Joining (DOJ)</label>
          <input
            type="date"
            name="doj"
            value={newAgent.doj}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Agent
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAgent;
