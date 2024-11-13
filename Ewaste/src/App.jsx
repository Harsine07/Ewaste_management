import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import RoleSelection from './components/Customer/CustomerLogin/RoleSelection';
import CustomerLogin from './components/Customer/CustomerLogin/CustomerLogin.jsx';
import AdminLogin from './components/Company/AdminLogin/AdminLogin.jsx';
import CustomerDashboard from './components/Customer/Dashboard/Dashboard.jsx';
import ScheduleBooking from './components/Customer/ScheduleBooking/ScheduleBooking.jsx';
import Registration from './components/Company/AdminLogin/Resigtration.jsx';
import CompanyLogin from './components/Company/CompanyLogin/CompanyLogin.jsx';
import AdminDashboard from './components/Company/AdminLogin/Dashboard';
import Dashboard from './components/Company/Dashboard/AdminDashboard.jsx';
import Agent from './components/Company/Agent/AgentList.jsx';
import AgentList from './components/Company/Agent/AgentList.jsx';
import AddAgent from './components/Company/Agent/AddAgent';
import OrderAssignment from './components/Company/OrderAssignment/NewOrders';
import Register from './components/Customer/CustomerLogin/CustomerRegister';
import CompanyDashboard from './components/Company/Dashboard/CompanyDashboard';
import AssignedOrders from './components/Company/OrderAssignment/Orders';
import AgentOrders from './components/Company/Agent/AgentOrders';
import OrderStatus from './components/Customer/OrderStatus.jsx';
import CompletedOrders from './components/Customer/CompletedOrder';
import OrderTracking from './components/Company/OrderAssignment/OrderTracking';
import OrderDone from './components/Company/CompanyLogin/CompletedOrder.jsx';
function App() {

  return (
    <Router>
      <Routes>

        {/* CUSTOMER ROUTES */}
        <Route path="/" element={<RoleSelection />} />
        
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/schedule-booking" element={<ScheduleBooking />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-register" element={<Registration />} />
        <Route path="/admin/agent" element={<AgentList />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/admin/orders" element={<OrderAssignment/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/company-dashboard" element={<CompanyDashboard/>} />
        <Route path="/view-orders" element={<AssignedOrders/>} />
        <Route path="/new-orders" element={<AgentOrders/>} />
        <Route path="/order-status" element={<OrderStatus/>} />
        <Route path="/completed-order" element={<CompletedOrders />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/view-database" element={<OrderDone />} />



      

      </Routes>
    </Router>
  );
}

export default App;
