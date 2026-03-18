import api from './api';

export const commentService = {
  getByBookId(bookId) {
    return api.get(`/commentaires?ouvrageId=${bookId}`).then(res => res.data);
  },
  add(commentData) {
    return api.post('/commentaires', commentData).then(res => res.data);
  },
  delete(id) {
    return api.delete(`/commentaires/${id}`).then(res => res.data);
  }
};