import React from 'react';

import { useNavigate } from 'react-router-dom';

import {
  AppBar, Box, Button, Toolbar, Typography,
} from '@mui/material';
import HighlightIcon from '@mui/icons-material/Highlight';

import useAuthContext from '../hooks/useAuthContext';

export default function Header() {
  const { user, dispatch } = useAuthContext();

  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      localStorage.removeItem('noteify-auth');
      dispatch({ type: 'LOGOUT' });
    }
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 1.25 }}>
      <AppBar position="relative" sx={{ p: 1.4 }}>
        <Toolbar>
          <HighlightIcon />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} fontFamily="Mclaren">
            Noteify
          </Typography>
          <Button color="inherit" onClick={handleClick} sx={{ ml: 2 }}>{user ? 'Logout' : 'Login'}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
