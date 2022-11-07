import React, { createContext, useReducer } from 'react';

export const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'GET_NOTES':
      return {
        notes: action.payload,
      };
    case 'CREATE_NOTE':
      return {
        notes: [...state.notes, action.payload],
      };
    case 'DELETE_NOTE':
      return {
        notes: state.notes.filter((note) => note._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export function NotesContextProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, {
    notes: [],
  });

  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
}
