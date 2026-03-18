import api from './api';

export const userService = {
<<<<<<< HEAD
  async getAll() {
    const { data } = await api.get('/utilisateurs');
    return data;
  },
  async login(email, password) {
    const { data } = await api.get(`/utilisateurs?email=${email}&password=${password}`);
    return data[0] || null;
  },
  async getByEmail(email) {
    const { data } = await api.get(`/utilisateurs?email=${email}`);
    return data[0];
  },
  async register(userData) {
    const { data } = await api.post('/utilisateurs', userData);
    return data;
  }
};
=======
  getAll: () => api.get('/utilisateurs').then(res => res.data),
  getById: (id) => api.get(`/utilisateurs/${id}`).then(res => res.data),
  getByPseudo: (pseudo) => api.get(`/utilisateurs?pseudo=${pseudo}`).then(res => res.data)
};
>>>>>>> 1abec5514fc71ebdc181f7c7a4c3500bb8b99634
