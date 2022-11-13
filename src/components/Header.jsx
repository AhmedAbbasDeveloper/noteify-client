import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import HighlightIcon from '@mui/icons-material/Highlight';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import useAuthContext from '../hooks/useAuthContext';

export default function Header() {
  const { dispatch } = useAuthContext();

  const logout = () => {
    localStorage.removeItem('noteify-auth');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 1.25 }}>
      <AppBar position="relative" sx={{ p: 1.4 }}>
        <Toolbar>
          <HighlightIcon />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} fontFamily="Mclaren">
            Noteify
          </Typography>
          <Button color="inherit" onClick={logout} sx={{ ml: 2 }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
