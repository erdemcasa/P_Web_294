import api from './api';

export const userService = {
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
}
