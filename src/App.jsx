import React from 'react';

import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Notes from './pages/Notes';
import Login from './pages/Login';
import Register from './pages/Register';

import Footer from './components/Footer';

import useAuthContext from './hooks/useAuthContext';

import theme from './theme';
import './App.css';

export default function App() {
  const { user } = useAuthContext();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}
