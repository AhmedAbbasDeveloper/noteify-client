import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/cubes.png")',
        },
      },
    },
  },
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
    fontFamily: 'Montserrat, sans-serif',
  },
});
