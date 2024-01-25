import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Modal,
  styled, // Import the styled utility from @mui/system
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import car from '../images/car.png';
import auditreport from '../images/auditreport.png';
import AuditDash from "./AuditDash"
import CompanyCars from '../Dashcomponents/DashModals/CompanyCars';
// Use the styled utility to create a styled component
const MyPaper = styled(Paper)({
  position: 'absolute',
  width: 400,
  backgroundColor: '#fff', // Replace with your desired background color
  border: '2px solid #000',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  padding: '16px',
});

const CarDash = () => {
  const [customers, setCustomers] = useState([]);
  const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
  const [selectedCustomerID, setSelectedCustomerID] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://animalbackend1.onrender.com/car/getAll");
        setCustomers(response.data.data);
      } catch (error) {
        console.error(`Error fetching customers' data: `, error);
      }
    };

    fetchCustomers();
  }, []);


  const searchUser = (e) => {
    e.preventDefault();
    setShowSearch(true);

    const result = customers

      .filter((customer) => {
        const userFirstName = (customer.immatricule || '').toLowerCase();
        const [searchFirstName] = searchName.toLowerCase().split(' ');

        return (
          userFirstName.includes(searchFirstName) 
        
        );
      });

    setResultSearch(result);
  };

  // const openViewCustomerModal = (userID) => {
  //   setSelectedCustomerID(customerID);
  //   setShowViewCustomerModal(true);
  // };

  const closeViewCustomerModal = () => {
    setShowViewCustomerModal(false);
  };

  return (
    <div>
      <form onSubmit={searchUser}>
        <div className="flex justify-end pb-6 pt-1">
          <TextField
            label="Search By Registration Number"
            variant="outlined"
            size="small"
            onChange={(e) => setSearchName(e.target.value.toLowerCase())}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!searchName}
            style={{ marginLeft: '8px' }}
          >
            Search
          </Button>
        </div>
      </form>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >Registration Number</TableCell>
              <TableCell >Brand</TableCell>
              <TableCell>Status </TableCell>
              <TableCell>Details </TableCell>
              <TableCell>Actions</TableCell> 
              <TableCell>Audit Report </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {(showSearch ? resultSearch : customers).map((customer) => (
              <TableRow key={customer._id} className="border-b">
                <TableCell>{customer.immatricule}</TableCell>
                <TableCell>{customer.brand}</TableCell>
                <TableCell>{customer.status}</TableCell>

                <TableCell>
                  <Link to={`/companycars/${customer._id}`}>
                    <img src={car} alt="car" />
                  </Link>
                </TableCell>
                <TableCell>
                  {/* <Button onClick={() => openEditCarModal(category._id)}> */}
                  <Button >
                    <EditIcon />
                  </Button>
                  </TableCell>

                  <TableCell>

                  <Link to={`/AuditDash`}>
                    <img src={auditreport} alt="auditreport" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default CarDash;
