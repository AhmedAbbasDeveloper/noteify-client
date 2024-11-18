import { createContext } from 'react';

import { NoteInput, NotesState } from '@/types';

interface NotesContextType extends NotesState {
  fetchNotes: () => Promise<void>;
  createNote: (note: NoteInput) => Promise<void>;
  updateNote: (id: string, note: NoteInput) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  startWrite: () => void;
  completeWrite: () => void;
}

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined,
);
