import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.55.227.130/api',
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;