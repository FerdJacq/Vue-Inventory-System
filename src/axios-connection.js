import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/', // Adjust URL as per your Laravel API
});

export default instance;
