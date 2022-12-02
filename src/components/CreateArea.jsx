import React, { useState } from 'react';

import uuid from 'react-uuid';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';
import useNotesContext from '../hooks/useNotesContext';

export default function CreateArea({
  id, title, content, onClose,
}) {
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();

  const [errorMessage, setErrorMessage] = useState(null);

  const [isExpanded, setExpanded] = useState(!!id);

  const [note, setNote] = useState({
    title: title ?? '',
    content: content ?? '',
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
      if (user) {
        const { data } = await apiClient.post('/notes', note, {
          headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
        });
        dispatch({ type: 'CREATE_NOTE', payload: data });
      } else {
        dispatch({ type: 'CREATE_NOTE', payload: { _id: uuid(), ...note } });
      }
      setNote({
        title: '',
        content: '',
      });
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const updateNote = async () => {
    try {
      if (user) {
        const { data } = await apiClient.patch(`/notes/${id}`, note, {
          headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
        });
        dispatch({ type: 'UPDATE_NOTE', payload: data });
      } else {
        dispatch({ type: 'UPDATE_NOTE', payload: { _id: id, ...note } });
      }
      setNote({
        title: '',
        content: '',
      });
      setErrorMessage(null);
      onClose();
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!note.title && !note.content) {
      setErrorMessage('Please add a title or content to your note.');
      return;
    }

    if (id) {
      await updateNote();
    } else {
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
          {errorMessage && (
          <Typography color="error" variant="body2" align="center">
            {errorMessage}
          </Typography>
          )}
          <Paper elevation={id ? 0 : 5} sx={{ p: 2, borderRadius: '7px' }}>
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
