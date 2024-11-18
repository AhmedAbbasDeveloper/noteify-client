import axios, { AxiosError } from 'axios';

interface ErrorResponse {
  message?: string;
}

export const api = axios.create({
  baseURL: 'https://noteify-server.fly.dev',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) =>
    Promise.reject(
      new Error(
        error.response?.data.message ?? 'An error occurred. Please try again.',
      ),
    ),
);
