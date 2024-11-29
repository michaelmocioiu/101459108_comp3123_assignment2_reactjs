import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export default api;