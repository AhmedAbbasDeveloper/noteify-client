import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';

export default function ErrorToast({ message, open, onClose }) {
  const action = (
    <IconButton
      size="small"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      message={message}
      action={action}
    />
  );
}
