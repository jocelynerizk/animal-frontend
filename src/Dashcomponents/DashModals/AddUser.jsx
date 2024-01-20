import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import axios from 'axios';

const AddUser = ({ fetchTeam, closeAddUserModal }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');
  const [description, setDescription] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');

  const validateInput = () => {
    if (!firstName) {
      setError('First name is required.');
      return false;
    }
    if (!lastName) {
      setError('Last name is required.');
      return false;
    }
    if (!email || !isValidEmail(email)) {
      setError('Email is required.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setPasswordsMatch(false);
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    if (!phoneNumber) {
      setError('Phone number is required.');
      return false;
    }
    if (!role) {
      setError('Role is required.');
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput() || !role) {
      return;
    }
    const user = {
      fullName: {
        firstName,
        lastName,
      },
      password,
      role,
      email,
      phoneNumber,
      city,
      fullAddress: {
        street,
        building,
        floor,
        description,
      },
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/register`,
        user
      );
      if (response.status === 200) {
        console.log('Registration successful!');
      }
    
      fetchTeam();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" color="secondary" align="center" gutterBottom>
        ADD USER
      </Typography>
      <Box textAlign="center">
        <form onSubmit={handleSubmit}>
          <Box mb={2} display="flex">
            <TextField
              type="text"
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Box mx={2}></Box>
            <TextField
              type="text"
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2} display="flex">
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Box mx={2}></Box>
            <TextField
              type="number"
              label="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2} display="flex">
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <Box mx={2}></Box>
            <TextField
              type="password"
              label="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box mb={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">Select role</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Box display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!passwordsMatch}
            >
              SUBMIT
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AddUser;
