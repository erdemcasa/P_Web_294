import api from './api';

export const commentService = {
  getAll: () => api.get('/commentaires').then(res => res.data),
  getByBookId: (bookId) => api.get(`/commentaires?ouvrage_id=${bookId}`).then(res => res.data),
  add: (data) => api.post('/commentaires', data).then(res => res.data)
};