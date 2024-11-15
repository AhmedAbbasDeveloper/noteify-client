import { Highlight } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail } from 'validator';

import { useAuth } from '@/hooks/useAuth';
import { LoginInput } from '@/types';

interface ValidationErrors {
  email: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formValues, setFormValues] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState<string>('');

  const validateInputs = useCallback(() => {
    const { email, password } = formValues;
    const errors: ValidationErrors = {
      email: isEmail(email) ? '' : 'Please enter a valid email address.',
      password: password ? '' : 'Please enter a password.',
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
    setLoginError('');

    if (!validateInputs()) return;

    const { email, password } = formValues;
    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      setLoginError((error as Error).message);
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
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              autoFocus
              required
              margin="normal"
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
              label="Password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              required
              margin="normal"
            />
          </FormControl>

          {loginError && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mt: 1 }}
            >
              {loginError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: loginError ? 2 : 3, mb: 2 }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center">
            {"Don't have an account? "}
            <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
