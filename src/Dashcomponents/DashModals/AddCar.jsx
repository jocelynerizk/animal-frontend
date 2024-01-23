import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, TextareaAutosize, Select, MenuItem, InputLabel, FormControl, Grid, Typography, Snackbar } from '@material-ui/core';

function AddCar({ fetchCars, closeAddCarModal }) {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState([]);
  const [status, setStatus] = useState('available');
  const [discountPercentage, setDiscountPercentage] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const token = localStorage.getItem('token');

  const handleAddImageInput = () => {
    if (images.length + 1 > 6) {
      setErrorMessage('Maximum 6 images allowed per product');
      return;
    }
    setImages((prevImages) => [...prevImages, null]);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === '' || !category || description.trim() === '' || price.trim() === '' || reference.trim() === '' || !images) {
      setErrorMessage('All fields are required');
      return;
    }

    const newCar = new FormData();
    newCar.append('name', name);
    newCar.append('categoryID', category);
    newCar.append('status', status);
    newCar.append('description', description);
    newCar.append('price', price);
    newCar.append('reference', reference);
    newCar.append('discountPercentage', discountPercentage);

    for (let i = 0; i < images.length; i++) {
      newCar.append('images', images[i]);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/add`, newCar, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${token}`
        },
      });
      console.log('Car added:', response.data);
      closeAddCarModal();
      fetchCars();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e, index) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = selectedImage;
        return newImages;
      });
    }
    setErrorMessage('');
  };

  const renderImageInputs = () => {
    const inputs = [];

    for (let i = 0; i < images.length; i++) {
      inputs.push(
        <input
          key={i}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, i)}
          className="flex-1 px-4 py-1 focus:outline-none text-black"
        />
      );
    }

    inputs.push(
      <Button key={inputs.length} onClick={handleAddImageInput} variant="contained" color="primary">
        Add image
      </Button>
    );

    return inputs;
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        console.error(`Error fetching categories' data: `, error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          ADD PRODUCT
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Car name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select category</InputLabel>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  label="Select category"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {allCategories.map((category) => (
                    <MenuItem key={category._id} value={category._id} className="capitalize">
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {renderImageInputs()}
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Reference"
                variant="outlined"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
              />
            </Grid>
          </Grid>
          {errorMessage !== '' && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
          <Grid container justify="flex-end" spacing={2}>
            <Grid item>
              <Button type="submit" variant="outlined" color="primary">
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Car added successfully"
        // Add other Snackbar props as needed
      />
    </Grid>
  );
}

export default AddCar;
