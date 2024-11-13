import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    contactNumber: '',
    landmark: '',
    customerType: '',
    timeAvailability: '',
  });
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/customers/register', formData);
      setNotification('Registration successful');
      navigate('/customer-login');
    } catch (error) {
      console.error('Registration failed:', error);
      setNotification('Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {['name', 'email', 'password', 'address', 'contactNumber', 'landmark', 'timeAvailability'].map((field) => (
            <div key={field} className="mb-5">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          ))}
          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700 mb-2">Type of Customer</label>
            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Type</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="government">Government</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white py-3 rounded-lg hover:from-blue-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
            Register
          </button>
        </form>
        {notification && <p className="text-center text-red-500 mt-4">{notification}</p>}
      </div>
    </div>
  );
};

export default Register;
