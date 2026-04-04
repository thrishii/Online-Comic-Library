import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.252.173.145/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;