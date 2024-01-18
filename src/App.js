import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import AdminDashboard from './Pages/AdminDashboard';
import Homepage from './Pages/Homepage';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Allcompanies from '../src/Dashcomponents/DashModals/Allcompanies';
import Allcars from '../src/Dashcomponents/DashModals/Allcars';
import Singlecar from './Dashcomponents/DashModals/Singlecar';
import Team from '../src/Dashcomponents/DashModals/Team';
import Logout from '../src/Dashcomponents/DashModals/Logout';
import SignIn from './Pages/SignIn';


const App = () => {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Allcompanies" element={<Allcompanies />} />
          <Route path="/Allcars" element={<Allcars />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/Singlecar" element={<Singlecar />} />

        </Routes>

    </div>
  );
};

export default App;
