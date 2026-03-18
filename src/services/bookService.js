import api from './api';

export const bookService = {
<<<<<<< HEAD
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
=======
  getAll: () => api.get('/ouvrages').then(res => res.data),
  getById: (id) => api.get(`/ouvrages/${id}`).then(res => res.data),
  getByUserId: (userId) => api.get(`/ouvrages?user_id=${userId}`).then(res => res.data),
  create: (data) => api.post('/ouvrages', data).then(res => res.data),
  update: (id, data) => api.put(`/ouvrages/${id}`, data).then(res => res.data),
  delete: (id) => api.delete(`/ouvrages/${id}`).then(res => res.data)
};
>>>>>>> 1abec5514fc71ebdc181f7c7a4c3500bb8b99634
