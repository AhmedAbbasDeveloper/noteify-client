import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';

import CreateArea from './CreateArea';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';
import useNotesContext from '../hooks/useNotesContext';

export default function Note({ id, title, content }) {
  const { user } = useAuthContext();
  const { dispatch } = useNotesContext();

  const [open, setOpen] = useState(false);

  const deleteNote = async () => {
    try {
      if (user) {
        const { data } = await apiClient.delete(`/notes/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
        });
        dispatch({ type: 'DELETE_NOTE', payload: data });
      } else {
        dispatch({ type: 'DELETE_NOTE', payload: { _id: id } });
      }
    } catch (error) {
      console.log(error);
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
          <Button size="small" onClick={() => setOpen(true)} sx={{ mr: -4 }}><EditIcon /></Button>
          <Button size="small" onClick={deleteNote} sx={{ ml: -4, mr: -2 }}><DeleteIcon /></Button>
        </CardActions>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <CreateArea id={id} title={title} content={content} onClose={() => setOpen(false)} />
      </Dialog>
    </>
  );
}
