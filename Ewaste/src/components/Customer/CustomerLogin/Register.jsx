// src/components/Customer/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ onClose }) => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Here, you can handle the registration logic
    console.log({
      companyName,
      email,
      password,
      address,
      contactNumber,
    });
    
    setNotification('Registration successful!');
    onClose(); // Close the registration form after submission
    navigate('/customer-dashboard'); // Redirect to the dashboard or another route
  };

  return (
    <div className="registration-form p-4 bg-white rounded-lg shadow-lg">
      
      <form onSubmit={handleRegister} autoComplete="off">
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full py-2 mb-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-200"
        >
          Submit
        </button>
      </form>
      {notification && <p className="text-green-600">{notification}</p>}
      
    </div>
  );
};

export default Register;
