import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Grid,
  Modal,
  Paper,
  IconButton,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import ViewCompanies from '../Dashcomponents/DashModals/ViewCompanies';

const CompanyDash = () => {
  const [customers, setCustomers] = useState([]);
  const [ordersPerUser, setOrdersPerUser] = useState([]);
  const [showViewCustomerModal, setShowViewCustomerModal] = useState(false);
  const [selectedCustomerID, setSelectedCustomerID] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const fetchCustomers = () => {
    axios.get("http://127.0.01:8000/user/getAll")
      .then((response) => {
        setCustomers(response.data.data);
        response.data.data.forEach((user) => {
          countOrderPerCustomer(user._id);
        });
      })
      .catch((error) => {
        console.error('Error fetching customers\' data: ', error);
      });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [sortOrder, setSortOrder] = useState(true);

  const toggleSort = (field) => {
    const sortedData = [...customers].sort((a, b) => {
      if (field === 'name') {
        const nameA = `${a.fullName.firstName} ${a.fullName.lastName}`.toLowerCase();
        const nameB = `${b.fullName.firstName} ${b.fullName.lastName}`.toLowerCase();

        if (nameA < nameB) return sortOrder ? -1 : 1;
        if (nameA > nameB) return sortOrder ? 1 : -1;
        return 0;
      } else if (field === 'orders') {
        const ordersA = ordersPerUser[a._id] || 0;
        const ordersB = ordersPerUser[b._id] || 0;

        return sortOrder ? ordersA - ordersB : ordersB - ordersA;
      } else if (field === 'email') {
        const emailA = a.email.toLowerCase();
        const emailB = b.email.toLowerCase();

        if (emailA < emailB) return sortOrder ? -1 : 1;
        if (emailA > emailB) return sortOrder ? 1 : -1;
        return 0;
      }
      return 0;
    });

    setCustomers(sortedData);
    setSortOrder(!sortOrder);
  };

  const countOrderPerCustomer = async (userID) => {
    try {
      const response = await axios.get("http://127.0.01:8000/car/getDetails/${userID}");
      setOrdersPerUser((prevOrdersPerUser) => ({
        ...prevOrdersPerUser,
        [userID]: response.data.data.length,
      }));
    } catch (error) {
      console.error('Error fetching orders\' data: ', error);
    }
  };

  const searchUser = (e) => {
    e.preventDefault();
    setShowSearch(true);

    const result = customers
      .map((customer) => {
        const userFirstName = (
          (customer.fullName && customer.fullName.firstName) ||
          ''
        ).toLowerCase();
        const userLastName = (
          (customer.fullName && customer.fullName.lastName) ||
          ''
        ).toLowerCase();

        const searchFirstName = searchName.split(' ')[0];
        const searchLastName = searchName.split(' ')[1];

        return (
          userFirstName.includes(searchFirstName) ||
          userFirstName.includes(searchLastName) ||
          userLastName.includes(searchFirstName) ||
          userLastName.includes(searchLastName)
        )
          ? customer
          : null;
      })
      .filter((item) => item !== null);

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
    <Container style={{ marginTop: '1rem' }}>
      <form onSubmit={searchUser} style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem' }}>
        <TextField
          style={{ marginRight: '1rem' }}
          type="search"
          variant="outlined"
          placeholder="Search for customer"
          onChange={(e) => setSearchName(e.target.value.toLowerCase())}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!searchName}
        >
          <SearchIcon />
        </Button>
      </form>

      <div style={{ overflowX: 'auto' }}>
        <Table style={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => toggleSort('name')}>Name {sortOrder ? '↓' : '↑'}</TableCell>
              <TableCell onClick={() => toggleSort('email')}>Email {sortOrder ? '↓' : '↑'}</TableCell>
              <TableCell onClick={() => toggleSort('orders')}>Number of orders {sortOrder ? '↓' : '↑'}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showSearch
              ? resultSearch.map((customer) => (
                  <TableRow key={customer._id} style={{ borderBottom: '1px solid #ccc' }}>
                    <TableCell>{`${customer.fullName.firstName} ${customer.fullName.lastName}`}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{ordersPerUser[customer._id] || 0}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => openViewCustomerModal(customer._id)}
                      >
                        <Typography variant="body2" style={{ color: 'red' }}>
                          View Details
                        </Typography>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              : customers
                  .filter((customer) => customer.role === 'company')
                  .map((customer) => (
                    <TableRow key={customer._id} style={{ borderBottom: '1px solid #ccc' }}>
                      <TableCell>{`${customer.fullName.firstName} ${customer.fullName.lastName}`}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{ordersPerUser[customer._id] || 0}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => openViewCustomerModal(customer._id)}
                        >
                          <Typography variant="body2" style={{ color: 'red' }}>
                            View Details
                          </Typography>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
          </TableBody>
        </Table>
      </div>

      <Modal
        open={showViewCustomerModal}
        onClose={closeViewCustomerModal}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper style={{ backgroundColor: '#fff', border: '2px solid #000', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.1)', padding: '2rem 4rem 3rem' }}>
          <IconButton onClick={closeViewCustomerModal}>
            <CloseIcon />
          </IconButton>
          <ViewCompanies userID={selectedCustomerID} />
        </Paper>
      </Modal>
    </Container>
  );
};

export default CompanyDash;
