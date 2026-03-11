import axios from 'axios';

const apiOuvrageService = axios.create({
  baseURL: 'http://localhost:3000/ouvrages',

  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiOuvrageService;
