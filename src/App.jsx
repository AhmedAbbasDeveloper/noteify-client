import React from 'react';

import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import Notes from './pages/Notes';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

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
          <Route path="/" element={user ? <Notes /> : <Navigate to="/login" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/sign-up" element={!user ? <SignUp /> : <Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ThemeProvider>
  );
}
