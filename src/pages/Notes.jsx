import React, { useEffect, useState } from 'react';

import { Alert, Container, Grid } from '@mui/material';

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
    const { data } = user
      ? await apiClient.get('/notes', {
        headers: { Authorization: `Bearer ${localStorage.getItem('noteify-auth')}` },
      })
      : { data: [] };
    return data;
  };

  useEffect(() => {
    getNotes().then((data) => {
      dispatch({ type: 'GET_NOTES', payload: data });
    }).catch(() => {
      setOpenErrorToast(true);
    });
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
          {notes?.map(({ id, title, content }) => (
            <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
              <Note id={id} title={title} content={content} />
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
