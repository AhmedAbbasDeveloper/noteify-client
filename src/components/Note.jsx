import React, { useState } from 'react';

import {
  Button, Card, CardActions, CardContent, Dialog, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
        : { data: { _id: id } };
      dispatch({ type: 'DELETE_NOTE', payload: data });
    } catch (error) {
      setOpenErrorToast(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          height: '100%', display: 'flex', flexDirection: 'column', borderRadius: '7px',
        }}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography>
            {content}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'right', mt: -3 }}>
          <Button size="small" onClick={() => setOpenEditor(true)} sx={{ mr: -4 }}><EditIcon /></Button>
          <Button size="small" onClick={deleteNote} sx={{ ml: -4, mr: -2 }}><DeleteIcon /></Button>
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
