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

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  firstName: string;
  lastName: string;
}
