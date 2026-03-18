import api from './api';

export const authorService = {
  getAll() {
    return api.get('/auteurs').then(res => res.data);
  },
  getById(id) {
    return api.get(`/auteurs/${id}`).then(res => res.data);
  }
};