import api from './api';

export const educadorService = {
  listar: () => api.get('/educadores').then(res => res.data),
  buscarPorId: (id) => api.get(`/educadores/${id}`).then(res => res.data),
  cadastrar: (data) => api.post('/educadores', data).then(res => res.data),
  atualizar: (id, data) => api.put(`/educadores/${id}`, data).then(res => res.data),
  excluir: (id) => api.delete(`/educadores/${id}`).then(res => res.data)
};
