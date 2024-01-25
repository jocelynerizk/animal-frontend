import React, { useState } from 'react';
import { styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

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

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function SearchAppBar() {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      setPopupOpen(true);
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
            inputProps={{ 'aria-label': 'search', onKeyDown: handleEnterKeyPress }}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </Search>
      </AppBar>

      <Dialog open={isPopupOpen} onClose={handleClosePopup}>
        <DialogTitle>
          <div style={{ color: 'blue' }}>Company Name + Vehicule Number</div>
        </DialogTitle>
        <DialogContent>
          <div style={{ color: 'green' }}>Certified Not Conforme on 01/01/2000 </div>
        </DialogContent>
        <Button onClick={handleClosePopup} color="primary">
            Fermer
          </Button>
      </Dialog>
    </Box>
  );
}
