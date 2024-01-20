import React, { useState } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from '../components/heropage/NavBar.jsx';
import Footer from '../components/heropage/Footer.jsx';
import { useForm, ValidationError } from '@formspree/react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

function ContactUs() {
  const [state, handleSubmit] = useForm('mnqenrgg');
  const [formData, setFormData] = useState({ email: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setFormData({ email: '', message: '' });

    if (state.succeeded) {
      window.alert('Thanks for joining!');
    }
  };

  return (
    <Container component="main" maxWidth="xl" style={{ backgroundColor: '#f0f8ff', padding: '20px' }}>
<CssBaseline />

 <NavBar />
 <Container  maxWidth="xs">
      <form onSubmit={handleFormSubmit}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>

        <Box mb={2}>
          <TextField
            id="email"
            type="email"
            label="Email Address"
            fullWidth
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
        </Box>

        <Box mb={2}>
          <TextField
            id="message"
            label="Message"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={state.submitting}
          style={{ marginLeft: '80%' }}

        >
          Submit
        </Button>
      </form>

      {state.succeeded && (
        <Typography variant="body1" gutterBottom>
        </Typography>
      )}
      </Container>
          <Footer />


    </Container>

  );
}

export default ContactUs;
