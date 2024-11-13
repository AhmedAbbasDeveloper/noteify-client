import { Highlight } from '@mui/icons-material';
import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const handleClick = () => isAuthenticated && logout();

  return (
    <Box sx={{ pb: 1.25 }}>
      <AppBar position="relative" sx={{ px: 1, py: 0.5 }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Highlight sx={{ fontSize: 30, ml: -2 }} />
            <Typography variant="h4" sx={{ flexGrow: 1, ml: 1.5 }}>
              Noteify
            </Typography>
          </Link>

          {!isAuthenticated ? (
            <Link href="/login" underline="none" color="inherit">
              <Button color="inherit">Login</Button>
            </Link>
          ) : (
            <Button onClick={handleClick} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
