import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.NODE_ENV === 'production' ? 'https://noteify-server.fly.dev' : 'http://localhost:4000'}`,
  timeout: 5000,
});
