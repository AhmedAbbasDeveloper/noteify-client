import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#eee',
    },
    primary: {
      main: '#f5ba13',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});

export default theme;
