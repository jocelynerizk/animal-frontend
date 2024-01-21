import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

function EditUser({ companyUsers, userID }) {
  const [userInfo, setUserInfo] = useState({
    fullName: { firstName: '', lastName: '' },
    email: '',
    phoneNumber: '',
  });
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUserInfoByID = async (userID) => {
      console.log('User ID to be checked:', userID);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/getById/${userID}`
        );
        console.log('User data retrieved successfully');
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error retrieving user data: ', error);
      }
    };

    getUserInfoByID(userID);
  }, [userID]);

  const validateInput = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const editUser = async (userID, userData) => {
    console.log('User ID to be updated:', userID);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update/${userID}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User updated successfully');
    } catch (error) {
      console.error('Error updating team member data: ', error);
      if (error.response) {
        console.log('Error while updating user');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      setError('Please select a role.');
      return;
    }

    const updatedFields = {};

    if (email !== '' && email !== userInfo.email) {
      updatedFields.email = email;
    } else {
      updatedFields.email = userInfo.email;
    }

    if (phoneNumber !== '' && phoneNumber !== userInfo.phoneNumber) {
      updatedFields.phoneNumber = phoneNumber;
    } else {
      updatedFields.phoneNumber = userInfo.phoneNumber;
    }

    if (
      password !== '' &&
      password === confirmPassword &&
      password !== userInfo.password
    ) {
      updatedFields.password = password;
    }

    if (role !== userInfo.role) {
      updatedFields.role = role;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    const user = {
      ...updatedFields,
    };

    try {
      await editUser(userID, updatedFields);
      
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <Container>
      <Typography variant="h5" color="secondary" align="center" gutterBottom>
        EDIT USER
      </Typography>
      <div className="text-center">
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <TextField
              label="First Name"
              variant="outlined"
              value={userInfo.fullName.firstName}
              InputProps={{
                readOnly: true,
              }}
              className="flex-1 mx-4"
            />
            <TextField
              label="Last Name"
              variant="outlined"
              value={userInfo.fullName.lastName}
              InputProps={{
                readOnly: true,
              }}
              className="flex-1 mx-4"
            />
          </div>
          <div className="flex mb-4">
            <TextField
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 mx-4"
            />
            <TextField
              type="number"
              label="Phone Number"
              variant="outlined"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 mx-4"
            />
          </div>

          <div className="flex mb-4">
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 mx-4"
            />
            <TextField
              type="password"
              label="Confirm Password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 mx-4"
            />
          </div>
          <div className="flex mb-4">
            <FormControl fullWidth variant="outlined">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mx-4"
              >
                <MenuItem value="">Select role</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
              </Select>
            </FormControl>
          </div>

          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={!passwordsMatch}
            >
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default EditUser;
