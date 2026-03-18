import api from './api';

export const bookService = {
  getAll() {
    return api.get('/ouvrages').then(res => res.data);
  },
  getById(id) {
    return api.get(`/ouvrages/${id}`).then(res => res.data);
  },
  create(bookData) {
    return api.post('/ouvrages', bookData).then(res => res.data);
  },
  update(id, bookData) {
    return api.put(`/ouvrages/${id}`, bookData).then(res => res.data);
  },
  delete(id) {
    return api.delete(`/ouvrages/${id}`).then(res => res.data);
  }
};