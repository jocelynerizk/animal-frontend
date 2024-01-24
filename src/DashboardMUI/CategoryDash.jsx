import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Paper,
  Backdrop,
  Fade
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import AddCategory from "../Dashcomponents/DashModals/AddCategory";
import DeleteCategory from "../Dashcomponents/DashModals/DeleteCategory";
import EditCategory from "../Dashcomponents/DashModals/EditCategory";
import details from "../images/details.png";

const CategoryDash = () => {
  const [categories, setCategories] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryID, setSelectedCategoryID] = useState(null);

  const token = localStorage.getItem('token');

  const fetchCategories = () => {
    axios.get('https://animalbackend1.onrender.com/category/getAll')
      .then((response) => {
        const categoriesData = response.data.data;
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.error(`Error fetching categories' data: `, error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (categoryID) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/category/delete/${categoryID}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      await fetchCategories();
      closeDeleteCategoryModal();
    } catch (error) {
      console.error('Error deleting category data: ', error);
      console.log('Error response:', error.response);
    }
  };

  const openDeleteCategoryModal = (categoryID) => {
    setSelectedCategoryID(categoryID);
    setShowDeleteCategoryModal(true);
  };

  const closeDeleteCategoryModal = () => {
    setShowDeleteCategoryModal(false);
  };

  const openEditCategoryModal = (categoryID) => {
    const selected = categories.find((category) => category._id === categoryID);
    setSelectedCategory(selected);
    setSelectedCategoryID(categoryID);
    setShowEditCategoryModal(true);
  };

  const closeEditCategoryModal = () => {
    setShowEditCategoryModal(false);
  };

  const AddCategoryButton = ({ openAddCategoryModal, closeAddCategoryModal, fetchCategories }) => {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    const handleOpen = () => {
      setShowAddCategoryModal(true);
      openAddCategoryModal();
    };

    const handleClose = () => {
      setShowAddCategoryModal(false);
      closeAddCategoryModal();
    };



    return (
      <div>
        <Button color="primary"

          onClick={handleOpen}
        >
          ADD CATEGORY
        </Button>
        <Modal
          open={showAddCategoryModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showAddCategoryModal}>
            <div className="bg-white p-6">
              <Button onClick={handleClose} className="absolute top-0 right-0 m-4 px-2 py-1">
                X
              </Button>
              <AddCategory fetchCategories={fetchCategories} closeAddCategoryModal={handleClose} />
            </div>
          </Fade>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category </TableCell>
              <TableCell>النوع</TableCell>
              <TableCell>Requirements </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.title}</TableCell>
                <TableCell>{category.title_a}</TableCell>
                <TableCell>
                  <Link to={`/RequirementDash/${category._id}`}>
                    <img src={details} alt="details" />
                  </Link>
                  <Button onClick={() => openEditCategoryModal(category._id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openDeleteCategoryModal(category._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCategoryButton
        openAddCategoryModal={() => setShowAddCategoryModal(true)}
        closeAddCategoryModal={() => setShowAddCategoryModal(false)}
        fetchCategories={fetchCategories}
      />

      <Modal open={showDeleteCategoryModal} onClose={closeDeleteCategoryModal}>
        <DeleteCategory
          fetchCategories={fetchCategories}
          closeDeleteCategoryModal={closeDeleteCategoryModal}
          deleteCategory={deleteCategory}
          categoryID={selectedCategoryID}
        />
      </Modal>

      <Modal open={showEditCategoryModal} onClose={closeEditCategoryModal}>
        <EditCategory
          fetchCategories={fetchCategories}
          closeEditCategoryModal={closeEditCategoryModal}
          categoryID={selectedCategoryID}
          category={selectedCategory}
        />
      </Modal>
    </div>
  );
};

export default CategoryDash;
