import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleCustomerLogin = () => {
    navigate('/customer-login');
  };

  const handleAdminLogin = () => {
    navigate('/company-login');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-blue-600 px-4"
      style={{
        backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
        backgroundSize: 'cover',
      }}
    >
      <h1 className="mb-12 text-4xl font-extrabold text-black drop-shadow-lg text-center">
        Select Your Role
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Customer Login Button */}
        <button
          onClick={handleCustomerLogin}
          className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135789.png"
            alt="Customer Icon"
            className="w-16 h-16 mb-4"
          />
          <p className="text-lg font-semibold text-gray-800 text-center">
            Customer Login
          </p>
        </button>

        {/* Company Login Button */}
        <button
          onClick={handleAdminLogin}
          className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition duration-300 transform hover:scale-105 flex flex-col items-center"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
            alt="Company Icon"
            className="w-16 h-16 mb-4"
          />
          <p className="text-lg font-semibold text-gray-800 text-center">
            Company Login
          </p>
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
