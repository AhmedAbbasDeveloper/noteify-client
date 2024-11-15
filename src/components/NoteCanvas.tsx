import { Add } from '@mui/icons-material';
import {
  Box,
  Container,
  Fab,
  Grid,
  InputBase,
  Paper,
  Zoom,
} from '@mui/material';
import { FormEvent, useCallback, useState } from 'react';

import { ErrorAlert } from '@/components/ErrorAlert';
import { useNotes } from '@/hooks/useNotes';
import { NoteInput } from '@/types';

export const NoteCanvas = ({
  id,
  title = '',
  content = '',
}: { id?: string } & Partial<NoteInput>) => {
  const { isWriting, createNote, updateNote, startWrite, completeWrite } =
    useNotes();

  const [formValues, setFormValues] = useState<NoteInput>({ title, content });
  const [noteError, setNoteError] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNoteError('');

    const { title, content } = formValues;
    if (!title && !content) {
      setNoteError('Please enter a title or content.');
      return;
    }

    try {
      if (id) {
        await updateNote(id, { title, content });
      } else {
        await createNote({ title, content });
      }

      setFormValues({ title: '', content: '' });
      completeWrite();
    } catch (error) {
      setNoteError((error as Error).message);
    }
  };

  const handleCloseErrorAlert = useCallback(() => {
    setNoteError('');
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
          mb: 2,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Paper elevation={id ? 0 : 5} sx={{ borderRadius: 2, p: 2 }}>
            <Grid container>
              <Zoom in={isWriting}>
                <Grid item xs={12}>
                  <InputBase
                    id="title"
                    name="title"
                    type="text"
                    value={formValues.title}
                    onChange={handleChange}
                    placeholder="Title"
                    fullWidth
                    sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                  />
                </Grid>
              </Zoom>

              <Grid item xs={12} sx={{ mt: isWriting ? 0 : -4.5 }}>
                <InputBase
                  id="content"
                  name="content"
                  type="text"
                  value={formValues.content}
                  onChange={handleChange}
                  placeholder="Take a note..."
                  onClick={startWrite}
                  multiline
                  rows={isWriting ? 3 : 1}
                  fullWidth
                  sx={{ fontSize: '1.2rem', fontWeight: 500 }}
                />
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mt: -2.5, mr: 2, textAlign: 'right' }}>
            <Zoom in={isWriting}>
              <Fab type="submit" size="small" color="primary">
                <Add />
              </Fab>
            </Zoom>
          </Box>
        </Box>
      </Box>

      <ErrorAlert
        errorMessage={noteError}
        handleClose={handleCloseErrorAlert}
      />
    </Container>
  );
};
