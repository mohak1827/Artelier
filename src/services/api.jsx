import axios from 'axios';

// Prefer deployed backend URL from env; fall back to local dev API
// In production on Netlify, set VITE_API_URL to your Render backend base, e.g. https://your-backend.onrender.com/api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
