import { createContext } from 'react';

import { AuthState, LoginInput, RegisterInput } from '@/types';

interface AuthContextType extends AuthState {
  register: (credentials: RegisterInput) => Promise<void>;
  login: (credentials: LoginInput) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
