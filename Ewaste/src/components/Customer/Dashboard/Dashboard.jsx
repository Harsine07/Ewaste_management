import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaShoppingCart, FaDatabase } from 'react-icons/fa'; // Icons

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", // Subtle background pattern
        backgroundSize: 'cover',
      }}
    >
      <h1 className="mb-8 text-4xl font-extrabold text-black drop-shadow-lg">
        Customer Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Schedule Booking */}
        <div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
          onClick={() => handleNavigate('/schedule-booking')}
        >
          <FaCalendarAlt className="w-16 h-16 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Schedule Booking</h2>
        </div>

        {/* View Orders */}
        <div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
          onClick={() => handleNavigate('/order-status')}
        >
          <FaShoppingCart className="w-16 h-16 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">View Orders</h2>
        </div>

        {/* View Database */}
        <div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer"
          onClick={() => handleNavigate('/completed-order')}
        >
          <FaDatabase className="w-16 h-16 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">View Database</h2>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
