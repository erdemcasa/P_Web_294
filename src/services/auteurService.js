import axios from 'axios';

const apiAuteurService = axios.create({
  baseURL: 'http://localhost:3000/auteurs',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiAuteurService;
