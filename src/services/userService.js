import axios from 'axios';

const apiUserService = axios.create({
  baseURL: 'http://localhost:3000/utilisateurs',

  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiUserService;
