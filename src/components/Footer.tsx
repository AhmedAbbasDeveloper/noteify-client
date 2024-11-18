import { Box, Container, Typography } from '@mui/material';

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 4,
      mt: 'auto',
    }}
  >
    <Container maxWidth="sm">
      <Typography variant="body2" align="center">
        {`Copyright © ${new Date().getFullYear().toString()} Ahmed Abbas`}
      </Typography>
    </Container>
  </Box>
);
