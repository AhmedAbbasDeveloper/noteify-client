export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  firstName: string;
  lastName: string;
}

export interface DecodedToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: DecodedToken | null;
}

export interface NoteInput {
  title: string;
  content: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  creatorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NotesState {
  notes: Note[];
  isWriting: boolean;
}
