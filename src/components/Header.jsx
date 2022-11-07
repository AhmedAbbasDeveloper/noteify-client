import React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import HighlightIcon from '@mui/icons-material/Highlight';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, pb: 1.25 }}>
      <AppBar position="relative" sx={{ p: 1.4 }}>
        <Toolbar>
          <HighlightIcon />
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} fontFamily="Mclaren">
            Noteify
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
