import { Alert, Snackbar } from '@mui/material';

export const ErrorAlert = ({
  errorMessage,
  handleClose,
}: {
  errorMessage: string;
  handleClose: () => void;
}) => (
  <Snackbar open={!!errorMessage} onClose={handleClose} autoHideDuration={3000}>
    <Alert severity="error" onClose={handleClose}>
      {errorMessage}
    </Alert>
  </Snackbar>
);
