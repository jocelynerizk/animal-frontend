import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg" sx={{ width: '90%' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',  
          }}
        >
 
          <Typography component="h1" variant="h5" marginBottom={5}>
          Car Details
          </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="Registration Vehicule Number"
                  required
                  fullWidth
                  id="immatricule"
                  label="Registration Vehicule Number"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  fullWidth
                  id="category"
                  label="Category"
                  name="Category"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  required
                  fullWidth
                  id="status"
                  label="Status"
                  name="Status"
                  autoComplete="family-name"
                  >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="To Be Audited">To Be Audited</MenuItem>
                <MenuItem value="To Be Supervised">To Be Supervised</MenuItem>
                <MenuItem value="Conforme">Conforme</MenuItem>
                <MenuItem value="Not Conforme">Not Conforme</MenuItem>
                <MenuItem value="Out Of Service">Out Of Service</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="Brand"
                  fullWidth
                  id="brand"
                  label="Brand"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  id="maxweight"
                  label="Max Weight"
                  name="Max Weight"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
  
                  fullWidth
                  id="dtenservice"
                  label="Model"
                  name="Model"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                label="Supervised By"
                id="superid"
                name="Supervised By"
              >
                <MenuItem value="Admin1">Admin1</MenuItem>
                <MenuItem value="Admin2">Admin2</MenuItem>
                <MenuItem value="Admin3">Admin3</MenuItem>
              </TextField>

            </Grid>

            {/* Dropdown List 2 */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                label="Audited By"
                id="auditid"
                name="audtitid"
              >
                <MenuItem value="Dr. Sirious">Dr. Sirious</MenuItem>
                <MenuItem value="Dr. Ali">Dr. Ali</MenuItem>
                <MenuItem value="Mr. Nouhad">Mr. Nouhad</MenuItem>
              </TextField>

            </Grid>

            {/* Dropdown List 3 */}
            <Grid item xs={12} sm={4}>
              <TextField
                select
                required
                fullWidth
                label="Company"
                id="Company"
                name="Company"
              >
                <MenuItem value="Taanayel">Taanayel</MenuItem>
                <MenuItem value="Khoury">Khoury</MenuItem>
                <MenuItem value="Bonjus">Bonjus</MenuItem>
              </TextField>

            </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                      control={<Checkbox value="Locked" color="primary" />}
                      label="Certification Is Delivered You are not allowed to change Data"
                      sx={{
                        '& .MuiFormControlLabel-label': {
                          color: 'red',        
                          fontSize: '0.7rem', 
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Audit Report
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Return
            </Button>
          </Grid>
        </Grid>
 
          </Box>

      </Container>
    </ThemeProvider>
  );
}