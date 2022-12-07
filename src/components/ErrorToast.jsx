import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';

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
