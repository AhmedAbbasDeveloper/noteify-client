// import AddIcon from "@mui/icons-material/Add"
// import Fab from "@mui/material/Fab"
// import Zoom from "@mui/material/Zoom"
// import React, { useState } from "react"


// function Login() {
//   const [note, setNote] = useState({
//     id: ""
//   })

//   function handleChange(event: any) {
//     const { value } = event.target
//     setNote({ id: value })
//   }

//   function createNote(event: any) {
//     event.preventDefault()
//     window.localStorage.setItem("userId", note.id)
//     window.dispatchEvent(new Event("storage"))
//   }

//   return (
//     <form className="create-note" onSubmit={createNote}>
//       <div className="create-note-input">
//         <input
//           name="title"
//           type="text"
//           value={note.id}
//           placeholder="Title"
//           autoFocus
//           onChange={handleChange}
//         />
//       </div>

//       <Zoom in={true}>
//         <Fab onClick={createNote}>
//           <AddIcon />
//         </Fab>
//       </Zoom>
//     </form>
//   )
// }

// export default Login

import { useMutation } from '@apollo/client';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { LOGIN } from '../api_calls/User';

function Copyright(props: any) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [loginMutation] = useMutation(LOGIN)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log({
      email: formData.get('email'),
      password: formData.get('password'),
    });

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}