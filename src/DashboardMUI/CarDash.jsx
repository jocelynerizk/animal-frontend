import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Modal,
  Backdrop,
  Fade,
  TextField,
  MenuItem,
  Menu,
} from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '@mui/icons-material';
import AddCar from '../Dashcomponents/DashModals/AddCar';
import DeleteCar from '../Dashcomponents/DashModals/DeleteCar';
import EditCar from '../Dashcomponents/DashModals/EditCar';
import DeleteCarImage from '../Dashcomponents/DashModals/DeleteCarImage';

const CarDash = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [filterShow, setFilterShow] = useState(false);
  const [showFilterItem, setShowFilterItem] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/car/getAll`);
      setProducts(response.data.data);
      const categoryIds = response.data.data.map((product) => product.categoryID);
      categoryIds.forEach(fetchCategoryName);
    } catch (error) {
      console.error(`Error fetching products' data: `, error);
    }
  };

  const fetchCategoryName = async (ID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/category/getbyID/${ID}`);
      const { name } = response.data.data;
      setCategories((prevCategories) => ({
        ...prevCategories,
        [ID]: name,
      }));
    } catch (error) {
      console.error(`Error fetching categories' data: `, error);
    }
  };

  const toggleSort = (field) => {
    // Your sorting logic here
  };

  const openAddProductModal = () => {
    setShowAddProductModal(true);
  };

  const closeAddProductModal = () => {
    setShowAddProductModal(false);
  };

  const openDeleteProductModal = (productID) => {
    setSelectedProductID(productID);
    setShowDeleteProductModal(true);
  };

  const closeDeleteProductModal = () => {
    setShowDeleteProductModal(false);
  };

  const editProduct = async (productID) => {
    // Your edit product logic here
  };

  const openEditProductModal = (productID) => {
    setSelectedProductID(productID);
    setShowEditProductModal(true);
  };

  const closeEditProductModal = () => {
    setShowEditProductModal(false);
  };

  const sortOptions = [
    { name: 'Clear filter', href: '#', current: false },
    { name: 'Available', href: '#', current: false },
    { name: 'Sold out', href: '#', current: false },
    { name: 'Discounted', href: '#', current: false },
  ];

  const selectedChangeFilter = (value) => {
    // Your filter logic here
  };

  const searchUser = (e) => {
    e.preventDefault();
    // Your search logic here
  };

  return (
    <div>
      <form onSubmit={searchUser}>
        {/* Your search form */}
      </form>

      {filterShow || showSearch ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => toggleSort('category')}>Category &#8597;</TableCell>
                  <TableCell onClick={() => toggleSort('name')}>Name &#8597;</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell onClick={() => toggleSort('price')}>Price &#8597;</TableCell>
                  <TableCell onClick={() => toggleSort('discountPercentage')}>Discounted &#8597;</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {showFilterItem.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{categories[product.categoryID]}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <img src={product.images[0]} alt="product" />
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.discountPercentage !== 0 ? `${product.discountPercentage}%` : '-'}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>
                      <Button onClick={() => openEditProductModal(product._id)}>
                        <img src="../Images/dashboardIcons/edit.png" alt="edit" />
                      </Button>
                      <Button onClick={() => openDeleteProductModal(product._id)}>
                        <img src="../Images/dashboardIcons/delete.png" alt="delete" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modals */}
          {showDeleteProductModal && (
            <Modal open={showDeleteProductModal} onClose={closeDeleteProductModal}>
              {/* ... (Delete Product Modal content) */}
            </Modal>
          )}
          {showAddProductModal && (
            <Modal open={showAddProductModal} onClose={closeAddProductModal}>
              <AddCar onClose={closeAddProductModal} />
            </Modal>
          )}
          {showEditProductModal && (
            <Modal open={showEditProductModal} onClose={closeEditProductModal}>
              <EditCar productID={selectedProductID} onClose={closeEditProductModal} />
            </Modal>
          )}
        </div>
      ) : (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => toggleSort('category')}>Category &#8597;</TableCell>
                  <TableCell onClick={() => toggleSort('name')}>Name &#8597;</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell onClick={() => toggleSort('price')}>Price &#8597;</TableCell>
                  <TableCell onClick={() => toggleSort('discountPercentage')}>Discounted &#8597;</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{categories[product.categoryID]}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <img src={product.images[0]} alt="product" />
                    </TableCell>
                    <TableCell>{product.price}$</TableCell>
                    <TableCell>{product.discountPercentage !== 0 ? `${product.discountPercentage}%` : '-'}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>
                      <Button onClick={() => openEditProductModal(product._id)}>
                        <img src="../Images/dashboardIcons/edit.png" alt="edit" />
                      </Button>
                      <Button onClick={() => openDeleteProductModal(product._id)}>
                        <img src="../Images/dashboardIcons/delete.png" alt="delete" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Modals */}
          {showDeleteProductModal && (
            <Modal open={showDeleteProductModal} onClose={closeDeleteProductModal}>
              {/* ... (Delete Product Modal content) */}
            </Modal>
          )}
          {showAddProductModal && (
            <Modal open={showAddProductModal} onClose={closeAddProductModal}>
              <AddCar onClose={closeAddProductModal} />
            </Modal>
          )}
          {showEditProductModal && (
            <Modal open={showEditProductModal} onClose={closeEditProductModal}>
              <EditCar productID={selectedProductID} onClose={closeEditProductModal} />
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default CarDash;
