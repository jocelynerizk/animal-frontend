import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import axios from 'axios';

const apiUrl = 'https://animalbackend1.onrender.com/getAllDetails/';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const Searchout = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [allDetails, setAllDetails] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAllDetails(response.data);
        console.log(setAllDetails)
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchData();
  }, []);

  const handleEnterKeyPress = () => {
    if (allDetails && allDetails.cars) {
      const filteredDetails = allDetails.cars.filter((car) =>
        car.immatricule.toLowerCase().includes(searchText.toLowerCase())
      );

      if (filteredDetails.length > 0) {
        setPopupOpen(true);
        setNoResults(false);
      } else {
        setPopupOpen(false);
        setNoResults(true);
      }
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, width: '100%', marginLeft: 'auto' }}>
      <AppBar position="static" sx={{ width: '100%' }}>
        <Search>
          <StyledInputBase
            placeholder="Search By vehicle registration number"
            inputProps={{
              'aria-label': 'search',
              onChange: (e) => setSearchText(e.target.value),
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  handleEnterKeyPress();
                }
              },
            }}
          />
          <div style={{ padding: '8px', height: '100%', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SearchIcon />
          </div>
        </Search>
      </AppBar>

      <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        <DialogTitle>
          <div style={{ color: 'blue' }}>Texte avec une couleur différente</div>
        </DialogTitle>
        <DialogContent>
          <div style={{ color: 'green' }}>Autre texte avec une couleur différente</div>
        </DialogContent>
        <Button onClick={handleClosePopup} color="primary">
          Fermer
        </Button>
      </Dialog>

      {noResults && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>
          Aucun résultat trouvé pour la recherche "{searchText}".
        </div>
      )}
    </Box>
  );
};

export default Searchout;
