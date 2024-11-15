import { ObjectId } from 'bson';
import { createContext, FC, ReactNode, useCallback, useReducer } from 'react';

import { api } from '@/api';
import { useAuth } from '@/hooks/useAuth';
import { Note, NoteInput } from '@/types';

interface NotesState {
  notes: Note[];
  isWriting: boolean;
}

type NotesAction =
  | { type: 'SET_NOTES'; payload: Note[] }
  | { type: 'CREATE_NOTE'; payload: Note }
  | { type: 'UPDATE_NOTE'; payload: Note }
  | { type: 'DELETE_NOTE'; payload: { id: string } }
  | { type: 'START_WRITE' }
  | { type: 'COMPLETE_WRITE' };

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

const notesReducer = (state: NotesState, action: NotesAction): NotesState => {
  switch (action.type) {
    case 'SET_NOTES':
      return { ...state, notes: action.payload };
    case 'CREATE_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: [
          action.payload,
          ...state.notes.filter((note) => note.id !== action.payload.id),
        ],
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
    case 'START_WRITE':
      return { ...state, isWriting: true };
    case 'COMPLETE_WRITE':
      return { ...state, isWriting: false };
    default:
      return state;
  }
};

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('noteify-auth')}`,
});

export const NotesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
    isWriting: false,
  });

  const fetchNotes = useCallback(async () => {
    try {
      const notes = isAuthenticated
        ? await api
            .get<Note[]>('/notes', {
              headers: getAuthHeaders(),
            })
            .then((res) => res.data)
        : [];
      dispatch({ type: 'SET_NOTES', payload: notes });
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Error fetching notes. Please try again.',
      );
    }
  }, [isAuthenticated]);

  const createNote = useCallback(
    async ({ title, content }: NoteInput) => {
      try {
        const newNote = isAuthenticated
          ? await api
              .post<Note>(
                '/notes',
                { title, content },
                { headers: getAuthHeaders() },
              )
              .then((response) => response.data)
          : {
              id: new ObjectId().toString(),
              title,
              content,
              creatorId: new ObjectId().toString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };
        dispatch({ type: 'CREATE_NOTE', payload: newNote });
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : 'Error creating note. Please try again.',
        );
      }
    },
    [isAuthenticated],
  );

  const updateNote = useCallback(
    async (id: string, { title, content }: NoteInput) => {
      try {
        const noteToUpdate = state.notes.find((note) => note.id === id);
        if (!noteToUpdate) throw new Error('Note not found.');

        const updatedNote = isAuthenticated
          ? await api
              .patch<Note>(
                `/notes/${id}`,
                { title, content },
                { headers: getAuthHeaders() },
              )
              .then((res) => res.data)
          : {
              ...noteToUpdate,
              title,
              content,
              updatedAt: new Date().toISOString(),
            };
        dispatch({ type: 'UPDATE_NOTE', payload: updatedNote });
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : 'Error updating note. Please try again.',
        );
      }
    },
    [isAuthenticated, state.notes],
  );

  const deleteNote = useCallback(
    async (id: string) => {
      try {
        const noteToDelete = state.notes.find((note) => note.id === id);
        if (!noteToDelete) throw new Error('Note not found.');

        if (isAuthenticated)
          await api.delete(`/notes/${id}`, { headers: getAuthHeaders() });
        dispatch({ type: 'DELETE_NOTE', payload: { id } });
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : 'Error deleting note. Please try again.',
        );
      }
    },
    [isAuthenticated, state.notes],
  );

  const startWrite = () => {
    dispatch({ type: 'START_WRITE' });
  };

  const completeWrite = () => {
    dispatch({ type: 'COMPLETE_WRITE' });
  };

  return (
    <NotesContext.Provider
      value={{
        ...state,
        fetchNotes,
        createNote,
        updateNote,
        deleteNote,
        startWrite,
        completeWrite,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
