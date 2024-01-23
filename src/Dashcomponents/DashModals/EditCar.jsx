import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@material-ui/core';
import DeleteCarImage from '../DashModals/DeleteCarImage';

function EditCar({ fetchCars, closeEditCarModal, productID }) {
  const [productData, setCarData] = useState({
    name: '',
    images: [],
    description: '',
    reference: '',
    price: '',
    category: '',
    status: '',
    applyDiscount: false,
    discountPercentage: '',
  });
  const [allCategories, setAllCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showDiscount, setShowDiscount] = useState(false);
  const [isEditingImage, setISEditingImage] = useState(false);
  const [showDeleteCarImageModal, setShowDeleteCarImageModal] = useState({
    isOpen: false,
    imageIndex: null,
    productId: null,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAddImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('productID', productID);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/product/addImage`,
        formData,
        config
      );

      setISEditingImage((prev) => !prev);

      setCarData((prevCarData) => ({
        ...prevCarData,
        images: [...prevCarData.images, response.data.data.downloadURL],
      }));

      setImageFile(null);
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding image:', error.response.data.message);
      setErrorMessage('Failed to add image. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/product/update/${productID}`,
        productData,
        config
      );

      fetchCars();
      closeEditCarModal();
    } catch (error) {
      console.error('Error updating product:', error.response.data);
      setErrorMessage('Failed to update product. Please try again.');
    }
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/product/getByID/${productID}`)
      .then((response) => {
        const product = response.data.data;
        setCarData((prev) => ({
          ...prev,
          name: product.name,
          images: product.images,
          description: product.description,
          reference: product.reference,
          price: product.price,
          category: product.categoryID,
          status: product.status,
          discountPercentage: product.discountPercentage || 0,
        }));
      })
      .catch((error) => {
        console.error(`Error fetching product data: `, error);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        console.error(`Error fetching categories' data: `, error);
      });
  }, [productID, isEditingImage]);

  const handleDeleteImageModalClose = () => {
    setShowDeleteCarImageModal({ isOpen: false });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCarData((prevCarData) => ({
      ...prevCarData,
      categoryID: selectedCategoryId,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <p className="text-red-700 text-3xl text-center underline my-5">EDIT PRODUCT</p>
      <div className="text-center">
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <TextField
              type="text"
              label="Car name"
              className="flex-1 px-4 py-2"
              value={productData.name}
              onChange={(e) => setCarData({ ...productData, name: e.target.value })}
            />
            <span className="mx-4"></span>
            <FormControl className="flex mb-4">
              <InputLabel>Select category</InputLabel>
              <Select
                value={productData.categoryID}
                onChange={handleCategoryChange}
              >
                <MenuItem value="">Select category</MenuItem>
                {allCategories.map((category) => (
                  <MenuItem
                    key={category._id}
                    value={category._id}
                    className="capitalize"
                  >
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="flex mb-4">
              <InputLabel>Status</InputLabel>
              <Select
                value={productData.status}
                onChange={(e) => setCarData({ ...productData, status: e.target.value })}
              >
                <MenuItem value="">Status</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="sold">Sold</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex mb-4">
            <TextField
              rows={5}
              placeholder="Description"
              multiline
              className="flex-1 px-4 py-2 resize-none"
              value={productData.description}
              onChange={(e) => setCarData({ ...productData, description: e.target.value })}
            />
            <span className="mx-4"></span>
            <div className="flex flex-wrap justify-between w-96">
              {productData.images.map((image, index) => (
                <div key={index} className='relative w-fit'
                  style={{ maxWidth: '100px', minWidth: '100px', maxHeight: '100px', minHeight: '100px' }}>
                  <img
                    src={image}
                    alt="img"
                    style={{ maxWidth: '100px', minWidth: '100px', maxHeight: '100px', minHeight: '100px', objectFit: 'cover' }}
                    className="mx-2 mb-2"
                  />
                  <img src="../Images/dashboardIcons/delete.png" className="bg-white h-6 w-6 absolute bottom-2 right-0 z-10" alt="Delete Icon"
                    onClick={() => {
                      setShowDeleteCarImageModal({
                        isOpen: true,
                        imageIndex: index,
                        productId: productID,
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex mb-4">
            <Input
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            <Button
              type='button'
              onClick={handleAddImage}
            >
              Add
            </Button>
          </div>
          <div className="flex mb-4">
            <TextField
              type="text"
              placeholder="Price"
              value={productData.price}
              onChange={(e) => setCarData({ ...productData, price: e.target.value })}
              className="flex-1 px-4 py-2"
            />
            <span className="mx-4"></span>
            <TextField
              type="text"
              placeholder="Reference"
              value={productData.reference}
              onChange={(e) => setCarData({ ...productData, reference: e.target.value })}
              className="flex-1 px-4 py-2"
            />
          </div>
          <div className="flex mb-4">
            <div>
              <div className="flex items-center mb-2">
                <Checkbox
                  checked={showDiscount}
                  onChange={() => setShowDiscount(!showDiscount)}
                  className="mr-2"
                />
                <p className="text-black">Apply discount</p>
              </div>

              {showDiscount && (
                <div className="flex flex-col">
                  <TextField
                    type="number"
                    placeholder="Discount percentage %"
                    value={Math.max(0, productData.discountPercentage)}
                    className="px-4 py-2"
                    onChange={(e) =>
                      setCarData({
                        ...productData,
                        discountPercentage: Math.max(0, e.target.value),
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>

          {showDeleteCarImageModal.isOpen === true && (
            <Dialog open={true} onClose={handleDeleteImageModalClose}>
              <DialogTitle>Delete Image</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this image?
                </DialogContentText>
                <DialogActions>
                  <Button onClick={handleDeleteImageModalClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteImageModalClose();
                      setISEditingImage((prev) => !prev);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Confirm
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          )}

          {errorMessage !== '' && (
            <Snackbar
              open={true}
              autoHideDuration={6000}
              onClose={() => setErrorMessage('')}
              message={errorMessage}
            />
          )}

          <div className="flex justify-end">
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCar;
