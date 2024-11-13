import { Highlight } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail, isStrongPassword } from 'validator';

import { useAuth } from '@/hooks/useAuth';
import { RegisterInput } from '@/types';

type ValidationErrors = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formValues, setFormValues] = useState<RegisterInput>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [registerError, setRegisterError] = useState<string>('');

  const validateInputs = useCallback((): boolean => {
    const { firstName, lastName, email, password } = formValues;
    const errors: ValidationErrors = {
      firstName: firstName ? '' : 'First Name is required.',
      lastName: lastName ? '' : 'Last Name is required.',
      email: isEmail(email) ? '' : 'Please enter a valid email address.',
      password: isStrongPassword(password)
        ? ''
        : 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    };

    setValidationErrors(errors);
    return !Object.values(errors).some(Boolean);
  }, [formValues]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRegisterError('');

    if (!validateInputs()) return;

    const { firstName, lastName, email, password } = formValues;
    try {
      await register({ firstName, lastName, email, password });
      navigate('/');
    } catch (error) {
      setRegisterError((error as Error).message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Link to="/">
          <Avatar sx={{ bgcolor: 'primary.main', m: 1 }}>
            <Highlight />
          </Avatar>
        </Link>

        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formValues.firstName}
                  onChange={handleChange}
                  label="First Name"
                  placeholder="Your"
                  autoComplete="given-name"
                  error={!!validationErrors.firstName}
                  helperText={validationErrors.firstName}
                  required
                  autoFocus
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formValues.lastName}
                  onChange={handleChange}
                  label="Last Name"
                  placeholder="Name"
                  autoComplete="family-name"
                  error={!!validationErrors.lastName}
                  helperText={validationErrors.lastName}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleChange}
                  label="Email Address"
                  placeholder="your@email.com"
                  autoComplete="email"
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  label="Password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  required
                />
              </FormControl>
            </Grid>
          </Grid>

          {registerError && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mt: 1 }}
            >
              {registerError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: registerError ? 2 : 3, mb: 2 }}
          >
            Register
          </Button>

          <Typography variant="body2" align="center">
            {'Already have an account? '}
            <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
