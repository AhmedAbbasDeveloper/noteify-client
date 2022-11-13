import React, { useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import CreateArea from '../components/CreateArea';
import Header from '../components/Header';
import Note from '../components/Note';

import apiClient from '../clients/api-client';

import useNotesContext from '../hooks/useNotesContext';

export default function Notes() {
  const { notes, dispatch } = useNotesContext();

  const getNotes = async () => {
    try {
      const { data } = await apiClient.get('/notes');
      dispatch({ type: 'GET_NOTES', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <Header />
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
    </>
  );
}
