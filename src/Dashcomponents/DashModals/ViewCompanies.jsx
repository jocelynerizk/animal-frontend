import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Grid,
} from '@mui/material';

function ViewCompanies({ userID }) {
  const [customerInfo, setCustomerInfo] = useState({
    fullName: { firstName: '', lastName: '' },
    email: '',
    phoneNumber: '',
    fullAddress: { floor: '', building: '', street: '', description: '' },
    city: ''
  });

  useEffect(() => {
    const getUserInfoByID = async (userID) => {
      console.log('Customer ID to be checked:', userID);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getById/${userID}`);
        console.log('Response after get request:', response);
        console.log('Customer data retrieved successfully');
        console.log(response.data.data);
        setCustomerInfo(response.data.data);
      } catch (error) {
        console.error('Error retrieving customer data: ', error);
        console.log('Error response:', error.response);
      }
    };

    getUserInfoByID(userID);
  }, [userID]);

  return (
    <div>
      <Typography variant="h4" color="error" align="center" gutterBottom>
        CUSTOMER INFO
      </Typography>
      <Paper elevation={3} style={{ padding: '16px', marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={0} variant="outlined" style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                First Name
              </Typography>
              <Typography variant="body1">
                {customerInfo.fullName.firstName}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} variant="outlined" style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Last Name
              </Typography>
              <Typography variant="body1">
                {customerInfo.fullName.lastName}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} variant="outlined" style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="body1">
                {customerInfo.email}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={0} variant="outlined" style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Phone Number
              </Typography>
              <Typography variant="body1">
                {customerInfo.phoneNumber}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} variant="outlined" style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Typography variant="body1">
                {`${customerInfo.fullAddress.floor}, ${customerInfo.fullAddress.building}, ${customerInfo.fullAddress.street}`}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} variant="outlined" style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                City
              </Typography>
              <Typography variant="body1">
                {customerInfo.city}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={0} variant="outlined" style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">
                {customerInfo.fullAddress.description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ViewCompanies;
