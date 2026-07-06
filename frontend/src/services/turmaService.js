import api from './api';

export const turmaService = {
  listar: () => api.get('/turmas').then(res => res.data),
  buscarPorId: (id) => api.get(`/turmas/${id}`).then(res => res.data),
  cadastrar: (data) => api.post('/turmas', data).then(res => res.data),
  atualizar: (id, data) => api.put(`/turmas/${id}`, data).then(res => res.data),
  excluir: (id) => api.delete(`/turmas/${id}`).then(res => res.data)
};
