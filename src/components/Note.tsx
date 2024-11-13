import { Delete, Edit } from '@mui/icons-material';
import {
  Card,
  CardActions,
  CardContent,
  Dialog,
  IconButton,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { ErrorAlert } from '@/components/ErrorAlert';
import { NoteCanvas } from '@/components/NoteCanvas';
import { useNotes } from '@/hooks/useNotes';
import { NoteInput } from '@/types';

export const Note = ({ id, title, content }: { id: string } & NoteInput) => {
  const { isWriting, deleteNote, startWrite, completeWrite } = useNotes();

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [noteError, setNoteError] = useState<string>('');

  const handleOpenEditor = useCallback(() => {
    startWrite();
    setIsEditorOpen(true);
  }, [startWrite]);

  const handleCloseEditor = useCallback(() => {
    setIsEditorOpen(false);
    completeWrite();
  }, [completeWrite]);

  const handleDelete = async () => {
    try {
      await deleteNote(id);
    } catch (error) {
      setNoteError((error as Error).message);
    }
  };

  const handleCloseErrorAlert = useCallback(() => setNoteError(''), []);

  useEffect(() => {
    if (!isWriting) {
      setIsEditorOpen(false);
    }
  }, [isWriting]);

  return (
    <Card sx={{ borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography component="h2" variant="h5" gutterBottom>
          {title}
        </Typography>

        <Typography>{content}</Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', mt: -1 }}>
        <IconButton onClick={handleOpenEditor} color="primary">
          <Edit />
        </IconButton>

        <IconButton onClick={handleDelete} color="primary">
          <Delete />
        </IconButton>
      </CardActions>

      <Dialog open={isEditorOpen} onClose={handleCloseEditor}>
        {isEditorOpen && <NoteCanvas id={id} title={title} content={content} />}
      </Dialog>

      <ErrorAlert
        errorMessage={noteError}
        handleClose={handleCloseErrorAlert}
      />
    </Card>
  );
};
