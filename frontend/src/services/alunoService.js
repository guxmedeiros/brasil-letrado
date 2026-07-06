import api from './api';

export const alunoService = {
  listar: () => api.get('/alunos').then(res => res.data),
  buscarPorId: (id) => api.get(`/alunos/${id}`).then(res => res.data),
  cadastrar: (data) => api.post('/alunos', data).then(res => res.data),
  atualizar: (id, data) => api.put(`/alunos/${id}`, data).then(res => res.data),
  excluir: (id) => api.delete(`/alunos/${id}`).then(res => res.data)
};
