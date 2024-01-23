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
import { Link } from 'react-router-dom';
import car from '../images/car.png';

// Use the styled utility to create a styled component
const MyPaper = styled(Paper)({
  position: 'absolute',
  width: 400,
  backgroundColor: '#fff', // Replace with your desired background color
  border: '2px solid #000',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  padding: '16px',
});

const CompanyDash = () => {
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
        const response = await axios.get("http://127.0.01:8000/car/getAll");
        setCustomers(response.data.data);
      } catch (error) {
        console.error(`Error fetching customers' data: `, error);
      }
    };

    fetchCustomers();
  }, []);

  const toggleSort = (field) => {
    const sortedData = [...customers].sort((a, b) => {
      const compareValue = field === 'name' ? `${a.firstName} ${a.lastName}`.toLowerCase() : a.email.toLowerCase();
      const otherValue = field === 'name' ? `${b.firstName} ${b.lastName}`.toLowerCase() : b.email.toLowerCase();

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => toggleSort('name')}>Name &#8597;</TableCell>
              <TableCell onClick={() => toggleSort('email')}>Email &#8597;</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Cars</TableCell>
 
            </TableRow>
          </TableHead>
          <TableBody>
            {(showSearch ? resultSearch : customers).map((customer) => (
              <TableRow key={customer._id} className="border-b">
                <TableCell>{`${customer.firstName} ${customer.lastName}`}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>
                  <Link to={`/companycars/${customer._id}`}>
                    <img src={car} alt="car" />
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

export default CompanyDash;
