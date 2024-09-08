import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Enter from './Components/Enter/Enter'; 
import RoleSelect from './Components/RoleSelect/RoleSelect';
import Customer from './Components/Customer/Customer';
import Agent from './Components/Agent/Agent';
import Admin from './Components/Admin/Admin';
import CustomerHome from './Components/CustomerHome/CustomerHome';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Order from './Components/Order/Order';
import TrackOrder from './Components/Trackorder/TrackOrder';
import ContactUs from './Components/ContactUs/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import Distance from './Components/Distance/Distance';
import AgentHome from './Components/AgentHome/AgentHome';
import AgentNav from './Components/AgentNav/AgentNav'; 
import AgentContact from './Components/AgentContact/AgentContact';
import AgentAbout from './Components/AgentAbout/AgentAbout';
import AdminHome from './Components/AdminHome/AdminHome';
import GetOrders from './Components/GetOrders/GetOrder';
import GetQueries from './Components/GetQueries/GetQueries';
import GetUsers from './Components/GetUsers/GetUsers';
import AgentOrders from './Components/AgentOrders/AgentOrders';
import GetAgents from './Components/GetAgents/GetAgents';
import Details from './Components/TrackDetails/Details';
import ViewOrder from './Components/ViewOrder/ViewOrder';
import AgentProfile from './Components/Profiles/AgentProfile';
import CustomerProfile from './Components/Profiles/CustomerProfile';
import UserForm from './Components/UpdateForm/UserForm';
import OrderForm from './Components/UpdateForm/OrderForm';
import ForgetUser from './Components/ForgetPassword/ForgetUser';
import UserOtp from './Components/OTP/UserOTP';
import ForgetAgent from './Components/ForgetPassword/ForgetAgent';
import AgentOtp from './Components/OTP/AgentOtp';
import Payment from './Components/Payment/Payment';



function App() {
  return (
    <Router>
      <Routes>
          
      <Route path="/" element={<Enter />} />
      <Route path="/role-select" element={<RoleSelect />} />    
      <Route path="/customer" element={<Customer />} /> 
      <Route path="/agent" element={<Agent />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/customer-home" element={<CustomerHome />} /> 
      <Route path="/navbar" element={<Navbar/>} /> 
      <Route path="/footer" element={<Footer/>} /> 
      <Route path="/order/:from/:to" element={<Order />} />
      <Route path="/track-order" element={<TrackOrder />} /> 
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />  
      <Route path="/distance" element={<Distance />} />
      <Route path="/agenthome" element={<AgentHome />} /> 
      <Route path="/agentnav" element={<AgentNav />} /> 
      <Route path="/agentcontact" element={<AgentContact />} /> 
      <Route path="/agentabout" element={<AgentAbout />} /> 
      <Route path="/adminhome" element={<AdminHome />} /> 
      <Route path="/getorders" element={<GetOrders />} />
      <Route path="/getqueries" element={<GetQueries />} />
      <Route path="/getusers" element={<GetUsers />} />
      <Route path="/agentorders" element={<AgentOrders />} />
      <Route path="/getagents" element={<GetAgents />} />
      <Route path="/tarckdetails/:trk" element={<Details />} />
      <Route path="/view" element={<ViewOrder />} />
      <Route path="/agentProfile/:agId" element={<AgentProfile />} />
      <Route path="/customersProfile/:agId" element={<CustomerProfile />} />
      <Route path="/userUpdate/:id" element={<UserForm />} />
      <Route path="/orderUpdate/:id" element={<OrderForm />} />
      <Route path="/forgetUser" element={<ForgetUser />} />
      <Route path="/otpUser" element={<UserOtp />} />
      <Route path="/forgetAgent" element={<ForgetAgent />} />
      <Route path="/otpAgent" element={<AgentOtp />} />
      <Route path="/payment" element={<Payment />} />




        
      </Routes>
    </Router>
  );
}

export default App;

