import api from './api';

export const userService = {
  getAll: () => api.get('/utilisateurs').then(res => res.data),
  getById: (id) => api.get(`/utilisateurs/${id}`).then(res => res.data),
  getByPseudo: (pseudo) => api.get(`/utilisateurs?pseudo=${pseudo}`).then(res => res.data)
};