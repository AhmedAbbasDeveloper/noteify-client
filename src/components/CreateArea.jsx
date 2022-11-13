import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Zoom from '@mui/material/Zoom';

import apiClient from '../clients/api-client';

import useNotesContext from '../hooks/useNotesContext';

export default function CreateArea() {
  const { dispatch } = useNotesContext();

  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const createNote = async () => {
    try {
      const { data } = await apiClient.post('/notes', note, {
        headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
      });
      dispatch({ type: 'CREATE_NOTE', payload: data });
      setNote({
        title: '',
        content: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (note.title || note.content) {
      await createNote(note);
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 2 }}>
          <Paper elevation={5} sx={{ p: 2, borderRadius: '7px' }}>
            <Grid container>
              <Zoom in={isExpanded}>
                <Grid item xs={12}>
                  <InputBase
                    name="title"
                    type="text"
                    value={note.title}
                    placeholder="Title"
                    required
                    autoFocus
                    fullWidth
                    onChange={handleChange}
                    sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                  />
                </Grid>
              </Zoom>
              <Grid item xs={12} sx={{ mt: isExpanded ? 0 : -4.5 }}>
                <InputBase
                  name="content"
                  type="text"
                  value={note.content}
                  placeholder="Take a note..."
                  fullWidth
                  multiline
                  rows={isExpanded ? 3 : 1}
                  onChange={handleChange}
                  onClick={() => setExpanded(true)}
                  sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Box align="right" sx={{ mt: -2.5, mr: 2 }}>
            <Zoom in={isExpanded}>
              <Fab type="submit" size="small" color="primary" onClick={handleSubmit}>
                <AddIcon />
              </Fab>
            </Zoom>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
