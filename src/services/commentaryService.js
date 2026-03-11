import axios from 'axios';

const apiCommentaryService = axios.create({
  baseURL: 'http://localhost:3000/commentaires',

  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiCommentaryService;
