import { jwtDecode } from 'jwt-decode';
import { createContext, FC, ReactNode, useEffect, useReducer } from 'react';

import { api } from '@/api';
import { LoginInput, RegisterInput } from '@/types';

const LOCAL_STORAGE_KEY = 'noteify-auth';

interface AuthResponse {
  access_token: string;
}

interface DecodedToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: DecodedToken | null;
}

type AuthAction = { type: 'LOGIN'; payload: DecodedToken } | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  register: (credentials: RegisterInput) => Promise<void>;
  login: (credentials: LoginInput) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const storeToken = (token: string): DecodedToken => {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
  return jwtDecode<DecodedToken>(token);
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!token) return;

    try {
      const user = jwtDecode<DecodedToken>(token);

      const isTokenExpired = user.exp * 1000 < Date.now();
      if (isTokenExpired) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return;
      }
      dispatch({ type: 'LOGIN', payload: user });
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, []);

  const register = async ({
    firstName,
    lastName,
    email,
    password,
  }: RegisterInput) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      if (!data.access_token) {
        throw new Error('An error occurred. Please try again.');
      }

      const user = storeToken(data.access_token);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Registration failed. Please verify your information and try again.',
      );
    }
  };

  const login = async ({ email, password }: LoginInput) => {
    try {
      const { data } = await api.post<AuthResponse>('/auth/login', {
        email,
        password,
      });

      if (!data.access_token) {
        throw new Error('An error occurred. Please try again.');
      }

      const user = storeToken(data.access_token);
      dispatch({ type: 'LOGIN', payload: user });
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Invalid email or password. Please check your credentials and try again.',
      );
    }
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
