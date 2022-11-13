import React, { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import HighlightIcon from '@mui/icons-material/Highlight';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';

export default function SignUp() {
  const { dispatch } = useAuthContext();

  const [errorMessage, setErrorMessage] = useState(null);

  const signUpUser = async (user) => {
    try {
      const { data } = await apiClient.post('/users/sign-up', user);
      localStorage.setItem('noteify-auth', data.token);
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

    await signUpUser(user);
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
          Sign up
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
                autoFocus
                fullWidth
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
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>

          <Link href="/login">
            <Typography variant="body2" align="center">
              Already have an account? Sign in
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
