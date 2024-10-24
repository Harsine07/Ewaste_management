import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RoleSelection from './components/Customer/CustomerLogin/RoleSelection';
import CustomerLogin from './components/Customer/CustomerLogin/CustomerLogin.jsx';
import CompanyLogin from './components/Company/CompanyLogin/AdminLogin.jsx';
import Register from './components/Customer/CustomerLogin/Register.jsx';
import CustomerDashboard from './components/Customer/Dashboard/Dashboard.jsx';
import ScheduleBooking from './components/Customer/ScheduleBooking/ScheduleBooking.jsx';
import AdminDashboard from './components/Company/Dashboard/Dashboard.jsx';
function App() {
  return (
    <Router>
      <Routes>

        {/* CUSTOMER ROUTES */}
        <Route path="/" element={<RoleSelection />} />
        
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-register" element={<Register />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/schedule-booking" element={<ScheduleBooking />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
