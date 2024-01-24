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
import { Add as AddIcon } from '@material-ui/icons';
import AddCar from "./AddCar";

const CompanyCars = () => {
  const { ownerID } = useParams();
  const [cars, setCars] = useState([]);
  const [showAddCarModal, setShowAddCarModal] = useState(false);

  const fetchCars = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/car/getAllDetails/`);
      const carsData = response.data.data;

      setCars(carsData);

    } catch (error) {
      console.error('Error fetching cars data: ', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const openAddCarModal = () => {
    setShowAddCarModal(true);
  };

  const closeAddCarModal = () => {
    setShowAddCarModal(false);
  };

  const AddCarButton = () => (
    <div>
      <Button color="primary" onClick={openAddCarModal}>
        <AddIcon /> Add Car
      </Button>
      <Modal
        open={showAddCarModal}
        onClose={closeAddCarModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showAddCarModal}>
          <div className="bg-white p-6">
            <Button onClick={closeAddCarModal} className="absolute top-0 right-0 m-4 px-2 py-1">
              X
            </Button>
            <AddCar
              ownerID={ownerID}
              fetchCars={fetchCars}
              closeAddCarModal={closeAddCarModal}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );

  return (
    <div>
      <h1 style={{ color: 'aqua', textShadow: '2px 2px blue', textAlign: 'center' }}>Your Title Here</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registration Number</TableCell>
              <TableCell>Brand (Arabic)</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {cars.length > 0 ? (
            cars.map((car) => ( 
              <TableRow key={car._id}>
                <TableCell>{car.immatricule}</TableCell>
                <TableCell>{car.brand}</TableCell>
                <TableCell>{car.status}</TableCell>
              </TableRow> 
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3}>No cars available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCarButton />

      <Typography style={{ color: 'aqua', marginRight: '40px', textAlign: 'right' }}>
        <Link component={RouterLink} to="/CompanyDash">Return</Link>
      </Typography>
    </div>
  );
};

export default CompanyCars;
