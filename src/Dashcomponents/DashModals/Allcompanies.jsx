import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out, color 0.3s ease-in-out',

  '&:hover': {
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    color: '#0000FF',
  },
}));

const BlueShadowedBox = styled(Box)({
  backgroundColor: '#2196F3', // Blue color
  boxShadow: '0 4px 8px rgba(33, 150, 243, 0.1)', // Blue shadow
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 8px 16px rgba(33, 150, 243, 0.2)', // Blue shadow on hover
  },
});

// Define image URLs
const imageUrls = [
  { xs: 12, image: 'image-url-1.jpg', button: 'Button 1' },
  { xs: 12, image: 'image-url-2.jpg', button: 'Button 2' },
  { xs: 12, image: 'image-url-3.jpg', button: 'Button 3' },
  { xs: 12, image: 'image-url-4.jpg', button: 'Button 4' },
  { xs: 12, image: 'image-url-5.jpg', button: 'Button 5' },
  { xs: 12, image: 'image-url-6.jpg', button: 'Button 6' },
];

export default function ResponsiveGrid() {
  const items = imageUrls.map(({ xs, image, button }, index) => (
    <Grid item xs={xs} sm={4} md={4} key={index}>
      <Item>{`xs=${xs}`}</Item>
      <BlueShadowedBox>
        <img src={image} alt={`Image ${xs}`} style={{ width: '100%' }} />
        <Button variant="contained" color="primary">
          {button}
        </Button>
      </BlueShadowedBox>
    </Grid>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {items}
      </Grid>
    </Box>
  );
}
