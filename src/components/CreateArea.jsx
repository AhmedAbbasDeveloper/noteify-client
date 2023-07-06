import React, { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Box, Container, Fab, Grid, InputBase, Paper, Typography, Zoom,
} from '@mui/material';

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
      const { data } = user
        ? await apiClient.post('/notes', note, {
          headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
        })
        : { data: { id: crypto.randomUUID(), ...note } };
      dispatch({ type: 'CREATE_NOTE', payload: data });
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
      const { data } = user
        ? await apiClient.patch(`/notes/${id}`, note, {
          headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
        })
        : { data: { id, ...note } };
      dispatch({ type: 'UPDATE_NOTE', payload: data });
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
      await createNote();
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 2 }}>
          {errorMessage && (
          <Typography color="error" variant="body2" align="center">
            {errorMessage}
          </Typography>
          )}

          <Paper elevation={id ? 0 : 5} sx={{ borderRadius: '7px', p: 2 }}>
            <Grid container>
              <Zoom in={isExpanded}>
                <Grid item xs={12}>
                  <InputBase
                    name="title"
                    type="text"
                    value={note.title}
                    placeholder="Title"
                    onChange={handleChange}
                    required
                    fullWidth
                    sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                    autoFocus
                  />
                </Grid>
              </Zoom>

              <Grid item xs={12} sx={{ mt: isExpanded ? 0 : -4.5 }}>
                <InputBase
                  name="content"
                  type="text"
                  value={note.content}
                  placeholder="Take a note..."
                  multiline
                  rows={isExpanded ? 3 : 1}
                  onChange={handleChange}
                  onClick={() => setExpanded(true)}
                  fullWidth
                  sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Box align="right" sx={{ mt: -2.5, mr: 2 }}>
            <Zoom in={isExpanded}>
              <Fab type="submit" onClick={handleSubmit} size="small" color="primary">
                <AddIcon />
              </Fab>
            </Zoom>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
