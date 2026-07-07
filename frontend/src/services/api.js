import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Interceptor: injeta o Bearer token em toda requisição autenticada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bl_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: em 401/403 redireciona para o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('bl_token');
      localStorage.removeItem('bl_instituicao');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
