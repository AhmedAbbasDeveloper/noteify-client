import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { NotesProvider } from '@/context/notes/NotesProvider';
import { useAuth } from '@/hooks/useAuth';
import { Login } from '@/pages/Login';
import { Notes } from '@/pages/Notes';
import { Register } from '@/pages/Register';
import { theme } from '@/theme';

export const App = () => {
  const { isAuthenticated } = useAuth();

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
            <Route
              path="/register"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/"
              element={
                <NotesProvider>
                  <Notes />
                </NotesProvider>
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
