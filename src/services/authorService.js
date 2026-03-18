import api from './api';

export const authorService = {
  async getAll() {
    const { data } = await api.get('/auteurs');
    return data;
  },
  async getById(id) {
    const { data } = await api.get(`/auteurs/${id}`);
    return data;
  }
};
