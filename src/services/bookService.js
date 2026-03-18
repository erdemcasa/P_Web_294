import api from './api';

export const bookService = {
  getAll: () => api.get('/ouvrages').then(res => res.data),
  getById: (id) => api.get(`/ouvrages/${id}`).then(res => res.data),
  getByUserId: (userId) => api.get(`/ouvrages?user_id=${userId}`).then(res => res.data),
  create: (data) => api.post('/ouvrages', data).then(res => res.data),
  update: (id, data) => api.put(`/ouvrages/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/ouvrages/${id}`).then(res => res.data)
};