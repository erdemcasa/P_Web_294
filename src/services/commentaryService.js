import axios from 'axios';

const apiCommentaryService = axios.create({
  baseURL: 'http://localhost:3000/commentaires',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiCommentaryService;
