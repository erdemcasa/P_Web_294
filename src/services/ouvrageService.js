import axios from 'axios';

const apiOuvrageService = axios.create({
  baseURL: 'http://localhost:3000/ouvrages',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiOuvrageService;
