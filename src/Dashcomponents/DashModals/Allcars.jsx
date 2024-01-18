import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Search from '../../components/heropage/Search.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out, color 0.3s ease-in-out',

  padding: '20px',

  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 255, 255, 0.2)', // Aqua shadow on hover
    
    color: '#0000FF',
  },
}));

const BlueShadowedBox = styled(Box)({
    boxShadow: '0 4px 8px rgba(33, 150, 243, 0.1)', // Blue shadow
    transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 255, 255, 0.2)', // Aqua shadow on hover
  },
});

const TextWithEffect = styled('span')({
  color: '#0000FF',
  textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
  fontSize: '24px',
  fontWeight: 'bold',
  marginLeft: '10px',
});

// Define image URLs

const imageUrls = [
    { xs: 12, image: 'image-url-1.jpg', button: 'Button 1', car: 'Car 1', brand: 'Brand 1' },
    { xs: 12, image: 'image-url-2.jpg', button: 'Button 2', car: 'Car 2', brand: 'Brand 2' },
    { xs: 12, image: 'image-url-3.jpg', button: 'Button 3', car: 'Car 3', brand: 'Brand 3' },
    // ... add more objects with 'car' and 'brand' properties as needed
  ];
  

export default function ResponsiveGrid() {
    const items = imageUrls.map(({ xs, image, button, car, brand }, index) => (
      <Grid item xs={12} sm={4} md={4} key={index}>
        <BlueShadowedBox>
        <Item>{`xs=${xs}`}</Item>

          <img src={image} alt={`Image ${xs}`} style={{ width: '100%' }} />
          <div>{`Car: ${car}, Brand: ${brand}`}</div>
          <Button variant="contained" color="primary">
            {button}
          </Button>
        </BlueShadowedBox>
      </Grid>
    ));
  
    return (
      <Box sx={{ backgroundColor: '#F2F7F5', minHeight: '100vh', padding: '20px' }}>
        {/* Box for Search component (positioned to the right) */}
        <Box sx={{ position: 'absolute', top: 20, right: 0 }}>
          <Search />
        </Box>
        {/* Text "Car List" with effect */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', Right: '20%' }}>
          <TextWithEffect>Car List</TextWithEffect>
        </Box>
        {/* Box for Grid component (centered within the page) */}
        <Box sx={{ margin: '0 auto', maxWidth: '80%' }}>
          {/* Grid container */}
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {items}
          </Grid>
        </Box>
        {/* Button "Add Car" */}
        <Box sx={{ display: 'flex', justifyContent: 'left', paddingLeft: '10%' , marginTop: '20px' }}>
          <Button variant="contained" color="primary">
            Add Car
          </Button>
        </Box>
      </Box>
    );
  }