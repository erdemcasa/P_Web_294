import api from './api';

export const commentService = {
<<<<<<< HEAD
  async getByBookId(bookId) {
    const { data } = await api.get(`/commentaires?bookId=${bookId}&_expand=user`);
    return data;
  },
  async add(commentData) {
    const { data } = await api.post('/commentaires', commentData);
    return data;
  },
  async delete(id) {
    await api.delete(`/commentaires/${id}`);
    return true;
  }
};
=======
  getAll: () => api.get('/commentaires').then(res => res.data),
  getByBookId: (bookId) => api.get(`/commentaires?ouvrage_id=${bookId}`).then(res => res.data),
  add: (data) => api.post('/commentaires', data).then(res => res.data)
};
>>>>>>> 1abec5514fc71ebdc181f7c7a4c3500bb8b99634
