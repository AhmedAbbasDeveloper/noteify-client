import React from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import HighlightIcon from '@mui/icons-material/Highlight';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';

export default function Login() {
  const { dispatch } = useAuthContext();

  const loginUser = async (user) => {
    try {
      const { data } = await apiClient.post('/users/login', user);
      localStorage.setItem('noteify-auth', data.token);
      dispatch({ type: 'LOGIN', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email'),
      password: data.get('password'),
    };
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
          Sign in
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Link href="/sign-up">
            <Typography variant="body2" align="center">
              Don&#39;t have an account? Sign Up
            </Typography>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
