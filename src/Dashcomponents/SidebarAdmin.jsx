import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Routes, Route, useNavigate } from "react-router-dom";
import Allcompanies from '../Dashcomponents/DashModals/Allcompanies';
import Allcars from '../Dashcomponents/DashModals/Allcars';
import Team from "../Dashcomponents/DashModals/Team";
import Logout from "../Dashcomponents/DashModals/Logout";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function SidebarAdmin() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/Allcompanies");
        break;
      case 1:
        navigate("/Allcars");
        break;
      case 2:
        navigate("/Team");
        break;
      case 3:
        navigate("/Logout");
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider", height: "100%" }}
      >
        <Tab label="Companies" {...a11yProps(0)} />
        <Tab label="Cars" {...a11yProps(1)} />
        <Tab label="Team" {...a11yProps(2)} />
        <Tab label="Log OUT" {...a11yProps(3)} />
      </Tabs>

      <Routes>
        <Route
          path="/Allcompanies"
          element={
            <TabPanel value={value} index={0}>
              <Allcompanies />
            </TabPanel>
          }
        />
        <Route
          path="/Allcars"
          element={
            <TabPanel value={value} index={1}>
              <Allcars />
            </TabPanel>
          }
        />
        <Route
          path="/Team"
          element={
            <TabPanel value={value} index={2}>
              <Team />
            </TabPanel>
          }
        />
        <Route
          path="/Logout"
          element={
            <TabPanel value={value} index={3}>
              <Logout />
            </TabPanel>
          }
        />
      </Routes>
    </Box>
  );
}
