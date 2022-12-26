import React, { useState } from 'react';

import {
  Avatar, Box, Button, Container, Link, TextField, Typography,
} from '@mui/material';
import HighlightIcon from '@mui/icons-material/Highlight';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';

export default function Login() {
  const { dispatch } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState(null);

  const loginUser = async (user) => {
    try {
      const { data } = await apiClient.post('/auth/login', user);
      localStorage.setItem('noteify-auth', data.access_token);
      dispatch({ type: 'LOGIN', payload: data });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage('Invalid credentials');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (!user.email || !user.password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    await loginUser(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <HighlightIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            name="email"
            type="email"
            label="Email Address"
            autoComplete="email"
            required
            autoFocus
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            required
            fullWidth
            margin="normal"
          />
          {errorMessage && (
          <Typography color="error" variant="body2">
            {errorMessage}
          </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Link href="/register">
            <Typography variant="body2" align="center">
              Don&#39;t have an account? Register
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
