import api from './api';

export const authorService = {
  getAll: () => api.get('/auteurs').then(res => res.data),
  getById: (id) => api.get(`/auteurs/${id}`).then(res => res.data)
};