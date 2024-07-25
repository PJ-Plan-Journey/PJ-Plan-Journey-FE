import axios from 'axios';

const api = axios.create({
  baseURL: 'https://your-api-url.com/api', // 실제 API URL로 변경
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

