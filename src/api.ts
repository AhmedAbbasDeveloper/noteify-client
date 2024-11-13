import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://noteify-server.fly.dev',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      new Error(
        error.response?.data?.message || 'An error occurred. Please try again.',
      ),
    ),
);
