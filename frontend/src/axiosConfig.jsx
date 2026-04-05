import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.25.59.150/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;