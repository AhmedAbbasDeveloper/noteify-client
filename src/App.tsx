import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { NotesProvider } from '@/context/NotesContext';
import { useAuth } from '@/hooks/useAuth';
import { Login } from '@/pages/Login';
import { Notes } from '@/pages/Notes';
import { Register } from '@/pages/Register';
import { theme } from '@/theme';

export const App = () => {
  const { isAuthenticated } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/register',
      element: isAuthenticated ? <Navigate to="/" replace /> : <Register />,
    },
    {
      path: '/login',
      element: isAuthenticated ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: '/',
      element: (
        <NotesProvider>
          <Notes />
        </NotesProvider>
      ),
    },
  ]);

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
        <RouterProvider router={router} />
        <Footer />
      </Box>
    </ThemeProvider>
  );
};
