import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaGoogle, FaLock, FaUser } from 'react-icons/fa'; // Icons
import Loginlogo from '../../../assets/loginLogo.jpeg'; // Adjust the path as needed

const CompanyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // The password is the agent_id here
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/agent-login', {
        email,
        agent_id: password, // Using agent_id as the password
      });

      if (response.status === 200) {
        setNotification('Login successful');
        
        // Store the agent ID in localStorage for use in other components
        localStorage.setItem('agentId', password); 
        console.log("Agent ID stored in localStorage:", password);
        
        // Redirect to the dashboard after successful login
        navigate('/company-dashboard');
      }
    } catch (error) {
      if (error.response) {
        setNotification(error.response.data.message); // Show backend error message
      } else {
        setNotification('Error connecting to server'); // Handle network errors
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="image-container">
          <img src={Loginlogo} alt="Login Logo" className="background-image" />
        </div>
        <div className="login-box">
          <h2 className="login-title">Company Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <div className="input-container">
                <FaUser className="icon" />
                <input
                  type="email"
                  className="input-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="input-field">
              <div className="input-container">
                <FaLock className="icon" />
                <input
                  type="password"
                  className="input-control"
                  placeholder="Enter your Agent ID"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {notification && <p className="notification">{notification}</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyLogin;
