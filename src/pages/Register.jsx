import React, { useState } from 'react';

import HighlightIcon from '@mui/icons-material/Highlight';
import {
  Avatar, Box, Button, Container, Grid, Link, TextField, Typography,
} from '@mui/material';

import { isStrongPassword } from 'validator';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';

export default function Register() {
  const { dispatch } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState(null);

  const registerUser = async (user) => {
    try {
      const { data } = await apiClient.post('/auth/register', user);
      localStorage.setItem('noteify-auth', data.access_token);
      dispatch({ type: 'LOGIN', payload: data });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    };

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    if (!isStrongPassword(user.password)) {
      setErrorMessage('Password must be at least 8 characters long and contain at least one uppercase letter, lowercase letter, number and symbol');
      return;
    }

    await registerUser(user);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          mt: 8,
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main', m: 1 }}>
          <HighlightIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                type="text"
                label="First Name"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                type="text"
                label="Last Name"
                autoComplete="family-name"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                required
                fullWidth
              />
            </Grid>

            {errorMessage && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {errorMessage}
                </Typography>
              </Grid>
            )}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>

          <Link href="/login">
            <Typography variant="body2" align="center">
              Already have an account? Login
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
