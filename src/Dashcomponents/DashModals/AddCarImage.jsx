import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function AddProductImage({ closeDeleteProductImageModal, handleConfirm }) {
  return (
    <Dialog open={true} onClose={closeDeleteProductImageModal}>
      <DialogTitle>Delete Image</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this image?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteProductImageModal} color="primary">
          CANCEL
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddProductImage;
