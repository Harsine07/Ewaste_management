import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBoxOpen, FaDatabase } from 'react-icons/fa'; // Updated Icons

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
        backgroundSize: 'cover',
      }}
    >
      <h1 className="mb-12 text-5xl font-extrabold text-black drop-shadow-lg">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {/* New Orders */}
        <div
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer transform hover:scale-105"
          onClick={() => handleNavigate('/admin/agent')}
        >
          <FaUser className="w-20 h-20 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Agents</h2>
        </div>

        {/* Pending Orders */}
        <div
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer transform hover:scale-105"
          onClick={() => handleNavigate('/admin/orders')}
        >
          <FaBoxOpen className="w-20 h-20 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Orders Assignment</h2>
        </div>

        {/* View Database */}
        <div
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer transform hover:scale-105"
          onClick={() => handleNavigate('/view-orders')}
        >
          <FaDatabase className="w-20 h-20 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
