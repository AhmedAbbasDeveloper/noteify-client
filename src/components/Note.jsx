import React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

import apiClient from '../clients/api-client';

import useNotesContext from '../hooks/useNotesContext';

export default function Note({ id, title, content }) {
  const { dispatch } = useNotesContext();

  const deleteNote = async () => {
    try {
      const { data } = await apiClient.delete(`/notes/${id}`);
      dispatch({ type: 'DELETE_NOTE', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        <Button size="small" onClick={deleteNote}><DeleteIcon /></Button>
      </CardActions>
    </Card>
  );
}
