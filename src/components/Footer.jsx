import React from 'react';

import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Typography variant="body1" color="#ccc" fontWeight={500} align="center" sx={{ pt: 4, pb: 4 }}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {' Ahmed Abbas'}
    </Typography>
  );
}
