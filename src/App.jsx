import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Login from './pages/Login';
import Notes from './pages/Notes';
import Register from './pages/Register';

import Footer from './components/Footer';

import { NotesContextProvider } from './context/NotesContext';

import useAuthContext from './hooks/useAuthContext';

import theme from './theme';
import './App.css';

export default function App() {
  const { user } = useAuthContext();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NotesContextProvider><Notes /></NotesContextProvider>} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
