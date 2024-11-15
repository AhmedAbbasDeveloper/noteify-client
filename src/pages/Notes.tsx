import { Alert, Container, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { ErrorAlert } from '@/components/ErrorAlert';
import { Header } from '@/components/Header';
import { Note } from '@/components/Note';
import { NoteCanvas } from '@/components/NoteCanvas';
import { useAuth } from '@/hooks/useAuth';
import { useNotes } from '@/hooks/useNotes';

export const Notes = () => {
  const { isAuthenticated } = useAuth();
  const { notes, fetchNotes } = useNotes();

  const [notesError, setNotesError] = useState<string>('');

  const loadNotes = useCallback(async () => {
    try {
      await fetchNotes();
    } catch (error) {
      setNotesError((error as Error).message);
    }
  }, [fetchNotes]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const handleCloseErrorAlert = useCallback(() => {
    setNotesError('');
  }, []);

  return (
    <>
      <Header />

      {!isAuthenticated && (
        <Alert severity="info" sx={{ mt: -1.1 }}>
          You are not logged in. You can still create notes, but they will not
          be saved.
        </Alert>
      )}

      <NoteCanvas />

      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ pl: 3, pr: 3 }}>
          {notes.map(({ id, title, content }) => (
            <Grid item key={id} xs={12} sm={6} md={4} lg={3}>
              <Note id={id} title={title} content={content} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ErrorAlert
        errorMessage={notesError}
        handleClose={handleCloseErrorAlert}
      />
    </>
  );
};
