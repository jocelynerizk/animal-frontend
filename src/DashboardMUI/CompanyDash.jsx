import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CompanyCars from '../Dashcomponents/DashModals/CompanyCars';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, // Import Paper directly
  TextField,
  Button,
  Modal,
} from '@mui/material';

import { Link } from 'react-router-dom';
import ViewCompanies from '../Dashcomponents/DashModals/ViewCompanies';
import car from "../images/car.png";

const CompanyDash = () => {
  const [customers, setCustomers] = useState([]);
  const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
  const [selectedCustomerID, setSelectedCustomerID] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sortOrder, setSortOrder] = useState(true);
  const [showcarscompany, setShowcarscompany] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://animalbackend1.onrender.com/user/getAll');
        setCustomers(response.data.data);
      } catch (error) {
        console.error('Error fetching customers data:', error);
      }
    };

    fetchCustomers();
  }, []);

  const toggleSort = (field) => {
    const sortedData = [...customers].sort((a, b) => {
      const compareValue = (field === 'name')
        ? `${a.firstName} ${a.lastName}`.toLowerCase()
        : a.email.toLowerCase();

      const otherValue = (field === 'name')
        ? `${b.firstName} ${b.lastName}`.toLowerCase()
        : b.email.toLowerCase();

      return sortOrder ? compareValue.localeCompare(otherValue) : otherValue.localeCompare(compareValue);
    });

    setCustomers(sortedData);
    setSortOrder(!sortOrder);
  };

  const searchUser = (e) => {
    e.preventDefault();
    setShowSearch(true);

    const result = customers
      .filter((customer) => customer.role === 'client')
      .filter((customer) => {
        const userFirstName = (customer.firstName || '').toLowerCase();
        const userLastName = (customer.lastName || '').toLowerCase();

        const [searchFirstName, searchLastName] = searchName.toLowerCase().split(' ');

        return (
          userFirstName.includes(searchFirstName) ||
          userFirstName.includes(searchLastName) ||
          userLastName.includes(searchFirstName) ||
          userLastName.includes(searchLastName)
        );
      });

    setResultSearch(result);
  };

  const openViewCustomerModal = (userID) => {
    setSelectedCustomerID(userID);
    setShowViewCustomerModal(true);
  };

  const closeViewCustomerModal = () => {
    setShowViewCustomerModal(false);
  };

  return (
    <div>
      <form onSubmit={searchUser}>
        <div className="flex justify-end pb-6 pt-1">
          <TextField
            label="Search for Company"
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
  {!showcarscompany ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell onClick={() => toggleSort('name')}>Name {sortOrder ? '↓' : '↑'}</TableCell>
          <TableCell onClick={() => toggleSort('email')}>Email {sortOrder ? '↓' : '↑'}</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell>Cars</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(showSearch ? resultSearch : customers).map((customer) => (
          <TableRow key={customer._id} className="border-b">
            <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phoneNumber}</TableCell>
            <TableCell>
            ownerID={selectedCustomerID}
              <Link to={`/CompanyCars/${customer._id}`}>
                <img src={car} alt="car" />
              </Link>
            </TableCell>
            <TableCell
              className="italic text-red-700 hover:underline"
              onClick={() => openViewCustomerModal(customer._id)}
            >
              View Details
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <CompanyCars />
  )}
</TableContainer>

      <Modal
        open={showViewCustomerModal}
        onClose={closeViewCustomerModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Paper className="modal-paper">
          <button
            onClick={closeViewCustomerModal}
            style={{ position: 'absolute', top: 0, right: 0, margin: '4px', padding: '4px' }}
          >
            X
          </button>
          <ViewCompanies ownerID={selectedCustomerID} />
        </Paper>
      </Modal>
    </div>
  );
};

export default CompanyDash;
