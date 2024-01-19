import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Routes, Route, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CategoryDash from "../DashboardMUI/CategoryDash";
import CarDash from "../DashboardMUI/CarDash";
import CompanyDash from "../DashboardMUI/CompanyDash";
import UserData from "../DashboardMUI/UserData";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../images/logo1.png";
import { CarRental } from '@mui/icons-material';
import { Business } from '@mui/icons-material';
import { AccountCircle } from '@mui/icons-material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MOA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    navigate("/CategoryDash");
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 0:
        navigate("/CategoryDash");
        break;
      case 1:
        navigate("/CompanyDash");
        break;
      case 2:
        navigate("/CarDash");
        break;
      case 3:
        navigate("/userData");
        break;
      default:
        break;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <img
              src={logo}
              alt="LOGO"
              style={{ maxHeight: '70px', marginRight: '900px' }}
            />
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Tabs
              orientation="vertical"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRight: 1,
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Tab
                label={open ? "Categories" : null}
                icon={
                  <ListItemIcon>
                    <AcUnitIcon
                      sx={{
                        color: value === 0 ? 'aqua' : 'blue',
                        fontSize: 40,
                        marginRight: '10px'
                      }}
                    />
                  </ListItemIcon>
                }
                {...a11yProps(0)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              />
              <Tab
                label={open ? "Companies" : null}
                icon={
                  <ListItemIcon>
                    <Business
                      sx={{
                        color: value === 1 ? 'aqua' : 'blue',
                        fontSize: 40,
                        marginRight: '10px'
                      }}
                    />
                  </ListItemIcon>
                }
                {...a11yProps(1)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              />
              <Tab
                label={open ? "Cars" : null}
                icon={
                  <ListItemIcon>
                    <CarRental
                      sx={{
                        color: value === 2 ? 'aqua' : 'blue',
                        fontSize: 40,
                        marginRight: '10px'
                      }}
                    />
                  </ListItemIcon>
                }
                {...a11yProps(2)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              />
              <Tab
                label={open ? "Users" : null}
                icon={
                  <ListItemIcon>
                    <AccountCircle
                      sx={{
                        color: value === 3 ? 'aqua' : 'blue',
                        fontSize: 40,
                        marginRight: '10px'
                      }}
                    />
                  </ListItemIcon>
                }
                {...a11yProps(3)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              />
            </Tabs>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Routes>
            <Route
              path="/CategoryDash"
              element={
                <TabPanel value={value} index={0}>
                  <CategoryDash />
                </TabPanel>
              }
            />
            <Route
              path="/CompanyDash"
              element={
                <TabPanel value={value} index={1}>
                  <CompanyDash />
                </TabPanel>
              }
            />
            <Route
              path="/CarDash"
              element={
                <TabPanel value={value} index={2}>
                  <CarDash />
                </TabPanel>
              }
            />
            <Route
              path="/userData"
              element={
                <TabPanel value={value} index={3}>
                  <UserData />
                </TabPanel>
              }
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
