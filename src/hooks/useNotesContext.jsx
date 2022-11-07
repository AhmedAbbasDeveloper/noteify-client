import { useContext } from 'react';

import { NotesContext } from '../context/NotesContext';

export default function useNotesContext() {
  const context = useContext(NotesContext);

  if (!context) {
    throw Error('useNotesContext must be used inside an NotesContextProvider');
  }

  return context;
}
