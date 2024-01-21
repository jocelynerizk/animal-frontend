import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Allcars from '../src/Dashcomponents/DashModals/Allcars';
import Singlecar from './Dashcomponents/DashModals/Singlecar';
import Team from '../src/Dashcomponents/DashModals/Team';
import Logout from '../src/Dashcomponents/DashModals/Logout';
import SignIn from "./Pages/SignIn";
import SignUP from "./Pages/SignUp";
import DashBoard from "./Pages/Dashboard"
import AddUser from "./Dashcomponents/DashModals/AddUser"
import EditUser from "./Dashcomponents/DashModals/EditUser"
import RequirementDash from "./DashboardMUI/RequirementDash"



const theme = createTheme();

const App = () => {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Allcars" element={<Allcars />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUP />} />
          <Route path="/Singlecar" element={<Singlecar />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/*" element={<DashBoard />} />
          <Route path="/RequirementDash/:categoryId" element={<RequirementDash />} />

        </Routes>
        </ThemeProvider>

    </div>
  );
};

export default App;
