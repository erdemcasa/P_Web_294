import api from './api';

export const commentService = {
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
