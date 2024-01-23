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
import AddCar from "./AddCar";
import DeleteCar from "./DeleteCar";
import EditCar from "./EditCar";

const CompanyCars = () => {
  const { ownerid } = useParams();
  const [cars, setCars] = useState([]);
  const [title, setTitle] = useState('');
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [showDeleteCarModal, setShowDeleteCarModal] = useState(false);
  const [showEditCarModal, setShowEditCarModal] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = async () => {
    try {
      const response = await axios.get("http://127.0.01:8000car/getDetails/${ownerid}");
      const carsData = response.data.data;
      console.log(carsData)
      console.log('Owner ID:', ownerid);
      console.log('Cars:', cars);
      setCars(carsData);
      setTitle(carsData.length > 0 ? carsData[0].catID.title : '');
    } catch (error) {
      console.error(`Error fetching cars' data: `, error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [ownerid]);

  const deleteCar = async (carId) => {
    try {
      console.log(`Deleting car with ID: ${carId}`);
      fetchCars();
      closeDeleteCarModal();
    } catch (error) {
      console.error('Error deleting car data: ', error);
    }
  };

  const openDeleteCarModal = (carId) => {
    setSelectedCar(cars.find((car) => car._id === carId));
    setShowDeleteCarModal(true);
  };

  const closeDeleteCarModal = () => {
    setShowDeleteCarModal(false);
  };

  const openEditCarModal = (carId) => {
    setSelectedCar(cars.find((car) => car._id === carId));
    setShowEditCarModal(true);
  };

  const closeEditCarModal = () => {
    setShowEditCarModal(false);
  };

  const AddCarButton = () => {
    const handleOpen = () => {
      setShowAddCarModal(true);
    };

    const handleClose = () => {
      setShowAddCarModal(false);
    };

    return (
      <div>
        <Button color="primary" onClick={handleOpen}>
          <AddIcon /> Add Car
        </Button>
        <Modal
          open={showAddCarModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={showAddCarModal}>
            <div className="bg-white p-6">
              <Button onClick={handleClose} className="absolute top-0 right-0 m-4 px-2 py-1">
                X
              </Button>
              <AddCar
                ownerId={ownerId}
                fetchCars={fetchCars}
                closeAddCarModal={handleClose}
              />
            </div>
          </Fade>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <h1 style={{ color: 'aqua', textShadow: '2px 2px blue', textAlign: 'center' }}>{title}</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Registration Number</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow key={car._id}>
                <TableCell>{car.immatricule}</TableCell>
                <TableCell>{car.title}</TableCell>
                <TableCell>{car.status}</TableCell>
                <TableCell>
                  <Button onClick={() => openEditCarModal(car._id)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => openDeleteCarModal(car._id)}>
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AddCarButton />

      <Typography  style={{ color: 'aqua',marginRight: '40px', textAlign:  'right' }}>
        <Link component={RouterLink} to="/CategoryDash">Return</Link>
      </Typography>

      <Modal open={showDeleteCarModal} onClose={closeDeleteCarModal}>
        <DeleteCar
          fetchCars={fetchCars}
          closeDeleteCarModal={closeDeleteCarModal}
          deleteCar={deleteCar}
          car={selectedCar}
        />
      </Modal>

      <Modal open={showEditCarModal} onClose={closeEditCarModal}>
        <EditCar
          fetchCars={fetchCars}
          closeEditCarModal={closeEditCarModal}
          car={selectedCar}
        />
      </Modal>
    </div>
  );
};

export default CompanyCars;
