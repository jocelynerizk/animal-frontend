import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/Homepage';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';

import Team from '../src/Dashcomponents/DashModals/Team';
import Logout from '../src/Dashcomponents/DashModals/Logout';
import SignIn from "./Pages/SignIn";
import SignUP from "./Pages/SignUp";
import DashBoard from "./Pages/Dashboard"
import AddUser from "./Dashcomponents/DashModals/AddUser"
import EditUser from "./Dashcomponents/DashModals/EditUser"
import RequirementDash from "./DashboardMUI/RequirementDash"
import CategoryDash from "./DashboardMUI/CategoryDash"
import CarDash from "./DashboardMUI/CarDash"
import AuditDash from "./DashboardMUI/AuditDash"
import CompanyDash from "./DashboardMUI/CompanyDash"
import UserData from "./DashboardMUI/UserData"
import PrivateRoute from './PrivateRoute';
import CompanyCars from "./Dashcomponents/DashModals/CompanyCars"
import NoAccess from './Pages/NoAccess';

const theme = createTheme();

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path='/Team'
            element={<PrivateRoute element={<Team />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          {/* {/* <Route path="/Team" element={<Team />} /> */}

          <Route path="/Logout" element={<Logout />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUP />} />
          <Route path='/NoAccess' element={<NoAccess />} />
          {/* schema user */}
          <Route path='/add-user'
            element={<PrivateRoute element={<AddUser />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          {/* <Route path="/add-user" element={<AddUser />} /> */}

          <Route path='/edit-user'
            element={<PrivateRoute element={<EditUser />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          {/* <Route path="/edit-user" element={<EditUser />} /> */}

          <Route path='/DashBoard'
            element={<PrivateRoute element={<DashBoard />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          {/* <Route path="/*" element={<DashBoard />} /> */}

          <Route path='/CategoryDash'
            element={<PrivateRoute element={<CategoryDash />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          <Route path='/CarDash'
            element={<PrivateRoute element={<CarDash />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          <Route path='/CompanyDash'
            element={<PrivateRoute element={<CompanyDash />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />

          <Route path='/UserData'
            element={<PrivateRoute element={<UserData />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />

          {/* {/* <Route path="/RequirementDash/:categoryId" element={<RequirementDash />} /> */}
          <Route path='/CompanyCars/:ownerid'
            element={<PrivateRoute element={<CompanyCars />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          <Route path='/RequirementDash/:categoryId'
            element={<PrivateRoute element={<RequirementDash />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          {/* <Route path="/CompanyCars/:ownerid" element={<CompanyCars />} /> */}
          <Route path='/AuditDash'
            element={<PrivateRoute element={<AuditDash />} allowedRoles={['admin', 'employee']} fallbackPath="/NoAccess" />}
          />
          {/* <Route path="/AuditDash" element={<AuditDash />} /> */}

        </Routes>
      </ThemeProvider>

    </div>
  );
};

export default App;
