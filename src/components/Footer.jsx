import React from 'react';

import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" color="#ccc" fontWeight={500} align="center">
          {`Copyright © ${new Date().getFullYear()} Ahmed Abbas`}
        </Typography>
      </Container>
    </Box>
  );
}
