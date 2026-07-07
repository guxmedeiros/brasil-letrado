import api from './api';
import axios from 'axios';

const AUTH_KEY = 'bl_token';
const INST_KEY = 'bl_instituicao';

export const authService = {
  async login(email, senha) {
    const { data } = await axios.post('http://localhost:8080/api/auth/login', { email, senha });
    localStorage.setItem(AUTH_KEY, data.token);
    localStorage.setItem(INST_KEY, JSON.stringify({ email: data.email, nome: data.nome }));
    return data;
  },

  async register(payload) {
    const { data } = await axios.post('http://localhost:8080/api/auth/register', payload);
    return data;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(INST_KEY);
  },

  getToken() {
    return localStorage.getItem(AUTH_KEY);
  },

  getInstituicao() {
    const raw = localStorage.getItem(INST_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem(AUTH_KEY);
  },
};
