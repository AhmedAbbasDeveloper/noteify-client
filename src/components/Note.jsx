import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card, CardActions, CardContent, Dialog, IconButton, Typography,
} from '@mui/material';

import CreateArea from './CreateArea';
import ErrorToast from './ErrorToast';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';
import useNotesContext from '../hooks/useNotesContext';

export default function Note({ id, title, content }) {
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();

  const [openEditor, setOpenEditor] = useState(false);
  const [openErrorToast, setOpenErrorToast] = useState(false);

  const deleteNote = async () => {
    try {
      const { data } = user
        ? await apiClient.delete(`/notes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
        })
        : { data: { id } };
      dispatch({ type: 'DELETE_NOTE', payload: data });
    } catch (error) {
      setOpenErrorToast(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: '7px', display: 'flex', flexDirection: 'column',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography component="h2" variant="h5" gutterBottom>
            {title}
          </Typography>

          <Typography>
            {content}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'right', mt: -3 }}>
          <IconButton onClick={() => setOpenEditor(true)} color="primary"><EditIcon /></IconButton>
          <IconButton onClick={deleteNote} color="primary"><DeleteIcon /></IconButton>
        </CardActions>
      </Card>

      <Dialog open={openEditor}>
        <CreateArea id={id} title={title} content={content} onClose={() => setOpenEditor(false)} />
      </Dialog>

      <ErrorToast
        message="Unable to delete note. Please try again later."
        open={openErrorToast}
        onClose={() => setOpenErrorToast(false)}
      />
    </>
  );
}
