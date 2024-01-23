import React from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

function DeleteCar({ fetchCars, closeDeleteCarModal, productID }) {
  const token = localStorage.getItem('token');

  const deleteCar = async () => {
    console.log('Car ID to be deleted:', productID);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete/${productID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Response after delete request:', response);
      console.log('Car deleted successfully');
      await fetchCars();
      closeDeleteCarModal();
    } catch (error) {
      console.error('Error deleting product data: ', error);
      console.log('Error response:', error.response);
      if (error.response) {
        console.log('Error status:', error.response.status);
        console.log('Error data:', error.response.data);
      }
    }
  };

  return (
    <Dialog open={true} onClose={closeDeleteCarModal}>
      <DialogTitle>Delete Car</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteCarModal} color="primary">
          Cancel
        </Button>
        <Button onClick={deleteCar} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCar;
