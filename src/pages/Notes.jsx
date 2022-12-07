import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import CreateArea from '../components/CreateArea';
import ErrorToast from '../components/ErrorToast';
import Header from '../components/Header';
import Note from '../components/Note';

import apiClient from '../clients/api-client';

import useAuthContext from '../hooks/useAuthContext';
import useNotesContext from '../hooks/useNotesContext';

export default function Notes() {
  const { user } = useAuthContext();
  const { notes, dispatch } = useNotesContext();

  const [openErrorToast, setOpenErrorToast] = useState(false);

  const getNotes = async () => {
    try {
      if (user) {
        const { data } = await apiClient.get('/notes', {
          headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
        });
        dispatch({ type: 'GET_NOTES', payload: data });
      } else {
        dispatch({ type: 'GET_NOTES', payload: [] });
      }
    } catch (error) {
      setOpenErrorToast(true);
    }
  };

  useEffect(() => {
    getNotes();
  }, [user]);

  return (
    <>
      <Header />
      {!user && (
      <Alert severity="info" variant="filled" sx={{ mt: -1 }}>
        You are not logged in. You can still create notes, but they will not be saved.
      </Alert>
      )}
      <CreateArea />
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
          {notes.map(({ _id, title, content }) => (
            <Grid item key={_id} xs={12} sm={6} md={4} lg={3}>
              <Note id={_id} title={title} content={content} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ErrorToast
        message="Unable to get notes. Please try again later."
        open={openErrorToast}
        onClose={() => setOpenErrorToast(false)}
      />
    </>
  );
}
