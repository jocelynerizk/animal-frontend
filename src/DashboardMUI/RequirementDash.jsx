import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link as RouterLink } from 'react-router-dom';

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
  Typography,
  Fade,
  Link
} from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import AddRequirement from "../Dashcomponents/DashModals/AddRequirement";
import DeleteRequirement from "../Dashcomponents/DashModals/DeleteRequirement";
import EditRequirement from "../Dashcomponents/DashModals/EditRequirement";

const RequirementDash = () => {
  const { categoryId } = useParams();
  const [requirements, setRequirements] = useState([]);
  const [title, setTitle] = useState('');
  const [showAddRequirementModal, setShowAddRequirementModal] = useState(false);
  const [showDeleteRequirementModal, setShowDeleteRequirementModal] = useState(false);
  const [showEditRequirementModal, setShowEditRequirementModal] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState(null);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get(`'http://127.0.01:8000/getAllByCategoryID/${categoryId}`);
      const requirementsData = response.data.data;
      setRequirements(requirementsData);
      setTitle(requirementsData.length > 0 ? requirementsData[0].catID.title : '');
      console.log('Data from server:', requirementsData);
    } catch (error) {
      console.error(`Error fetching requirements' data: `, error);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, [categoryId]);

  const deleteRequirement = async (requirementID) => {
    try {
      // Add your deletion logic here
      console.log(`Deleting requirement with ID: ${requirementID}`);
      // Refresh the list of requirements after deletion
      fetchRequirements();
      // Close the delete modal
      closeDeleteRequirementModal();
    } catch (error) {
      console.error('Error deleting requirement data: ', error);
    }
  };

  const openDeleteRequirementModal = (requirementID) => {
    setSelectedRequirement(requirements.find((requirement) => requirement._id === requirementID));
    setShowDeleteRequirementModal(true);
  };

  const closeDeleteRequirementModal = () => {
    setShowDeleteRequirementModal(false);
  };

  const openEditRequirementModal = (requirementID) => {
    setSelectedRequirement(requirements.find((requirement) => requirement._id === requirementID));
    setShowEditRequirementModal(true);
  };

  const closeEditRequirementModal = () => {
    setShowEditRequirementModal(false);
  };

  const AddRequirementButton = () => {
    const handleOpen = () => {
      setShowAddRequirementModal(true);
    };

    const handleClose = () => {
      setShowAddRequirementModal(false);
    };

    return (
      <div>
        <Button color="primary" onClick={handleOpen}>
          <AddIcon /> Add Requirement
        </Button>
        <Modal
          open={showAddRequirementModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showAddRequirementModal}>
            <div className="bg-white p-6">
              <Button onClick={handleClose} className="absolute top-0 right-0 m-4 px-2 py-1">
                X
              </Button>
              <AddRequirement
                categoryId={categoryId}
                fetchRequirements={fetchRequirements}
                closeAddRequirementModal={handleClose}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ color: '#2196F3', textShadow: '2px 2px 4px #00BCD4' }}>{title}</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Description (Arabic)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requirements.map((requirement) => (
              <TableRow key={requirement._id}>
                <TableCell>{requirement.desc}</TableCell>
                <TableCell>{requirement.desc_a}</TableCell>
                <TableCell>
                  <Button onClick={() => openEditRequirementModal(requirement._id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openDeleteRequirementModal(requirement._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddRequirementButton />

      <Typography style={{ color: 'aqua', marginRight: '40px', textAlign: 'right' }}>
        <Link component={RouterLink} to="/CategoryDash">Return</Link>
      </Typography>

      <Modal open={showDeleteRequirementModal} onClose={closeDeleteRequirementModal}>
        <DeleteRequirement
          fetchRequirements={fetchRequirements}
          closeDeleteRequirementModal={closeDeleteRequirementModal}
          deleteRequirement={deleteRequirement}
          requirement={selectedRequirement}
        />
      </Modal>

      <Modal open={showEditRequirementModal} onClose={closeEditRequirementModal}>
        <EditRequirement
          fetchRequirements={fetchRequirements}
          closeEditRequirementModal={closeEditRequirementModal}
          requirement={selectedRequirement}
        />
      </Modal>
    </div>
  );
};

export default RequirementDash;
