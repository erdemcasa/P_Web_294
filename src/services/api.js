import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
<<<<<<< HEAD
=======
  timeout: 5000,
>>>>>>> 1abec5514fc71ebdc181f7c7a4c3500bb8b99634
  headers: { 'Content-Type': 'application/json' }
});



export default api;
