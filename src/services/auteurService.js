import axios from 'axios';

const apiAuteurService = axios.create({
  baseURL: 'http://localhost:3000/auteurs',
  
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiAuteurService;
