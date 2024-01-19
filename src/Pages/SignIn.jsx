import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  useMediaQuery,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FailLogIn from "../SignInUpComponents/FailLogIn";

function SignIn() {
  const [email, setEmail] = useState("");
  const [showFailLogIn, setShowFailLogIn] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [FailMessage, setFailMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;

      if (response.status === 200) {
        console.log("Login successfully");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("role", data.data.role);

        if (data.data.role === "admin") {
          navigate("/AdminDashboard");
        } else if (data.data.role === "Team") {
          navigate("/TeamDashboard");
        } else if (data.data.role === "company") {
          await axios.get(`${process.env.REACT_APP_API_URL}/cart/getByUserID/${data.data._id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.data.token}`,
            },
          });

          navigate("/");
        }
      } else {
        console.log("Login failed:", data.message);
        setShowFailLogIn(true);
        setFailMessage(data.message);
      }
    } catch (error) {
      console.log("Error during login:", error.message);
      setShowFailLogIn(true);
      setFailMessage(error.response?.data.message);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Container maxWidth="lg" style={{ marginTop: '4px',  marginLeft: '33%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
        <Paper elevation={3} className="max-w-md p-12" style={{ textAlign: 'center', padding: '20px', width: isSmallScreen ? '100%' : '400px' }}>
          <Typography variant="h4" align="center" gutterBottom style={{ color: '#2196F3', textShadow: '2px 2px 4px #00BCD4' }}>
            WELCOME
          </Typography>
          <Box mb={2} marginTop={2}>
            <TextField
              type="email"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-3"
              sx={{ width: '100%' }}
            />
          </Box>

          <Box mb={2} marginTop={2}>
            <TextField
              type={showPassword ? "text" : "password"}
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-3"
              sx={{ width: '100%' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            className="w-full mb-3"
            onClick={handleSignIn}
            style={{ width: '80%' }}
          >
            LOG IN
          </Button>

          <div className="text-center">
            <Link to="/SignUp" className="underline text-lg hover:text-red-700">
              Don’t have an account yet? Sign up
            </Link>
          </div>
        </Paper>
      </Grid>

      {showFailLogIn && (
        <div className="fixed inset-0 max-w-screen flex items-center justify-center z-40">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute bg-white p-8 rounded shadow-md">
            <FailLogIn
              message={FailMessage}
              closeModal={() => setShowFailLogIn(false)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default SignIn;
