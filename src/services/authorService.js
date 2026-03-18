import api from './api';

export const authorService = {
<<<<<<< HEAD
  async getAll() {
    const { data } = await api.get('/auteurs');
    return data;
  },
  async getById(id) {
    const { data } = await api.get(`/auteurs/${id}`);
    return data;
  }
};
=======
  getAll: () => api.get('/auteurs').then(res => res.data),
  getById: (id) => api.get(`/auteurs/${id}`).then(res => res.data)
};
>>>>>>> 1abec5514fc71ebdc181f7c7a4c3500bb8b99634
