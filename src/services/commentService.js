import api from './api';

export const commentService = {
  async getByBookId(bookId) {
    const { data } = await api.get(`/commentaires?ouvrage_id=${bookId}`);
    return data.filter(c => String(c.ouvrage_id) === String(bookId));
  },

  async getAll() {
    const { data } = await api.get('/commentaires');
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
