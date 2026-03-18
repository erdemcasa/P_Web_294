import api from './api';

export const userService = {
  getAll() {
    return api.get('/utilisateurs').then(res => res.data);
  },
  getByEmail(email) {
    return api.get(`/utilisateurs?email=${email}`).then(res => res.data);
  },
  register(userData) {
    return api.post('/utilisateurs', userData).then(res => res.data);
  }
};