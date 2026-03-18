import api from './api';

export const bookService = {
  
  async getAll() {
    const { data } = await api.get('/ouvrages');
    return data;
  },
  async getById(id) {
    const { data } = await api.get(`/ouvrages/${id}`);
    return data;
  },
  async getByUserId(userId) {
    const { data } = await api.get(`/ouvrages?ownerId=${userId}`);
    return data;
  },
  async create(bookData) {
    const { data } = await api.post('/ouvrages', bookData);
    return data;
  },
  async update(id, bookData) {
    const { data } = await api.put(`/ouvrages/${id}`, bookData);
    return data;
  },
  async delete(id) {
    const { data } = await api.delete(`/ouvrages/${id}`);
    return data;
  }
};

