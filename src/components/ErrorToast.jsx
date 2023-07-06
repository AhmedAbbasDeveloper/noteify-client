import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Snackbar } from '@mui/material';

export default function ErrorToast({ message, open, onClose }) {
  const action = (
    <IconButton
      onClick={onClose}
      size="small"
      color="inherit"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      action={action}
      message={message}
      open={open}
      onClose={onClose}
      autoHideDuration={5000}
    />
  );
}
