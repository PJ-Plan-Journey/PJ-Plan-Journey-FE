import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://localhost:4000', // 백엔드 API 주소로 변경
  withCredentials: true, // 쿠키 사용을 위해 추가
});

// 요청 인터셉터를 사용하여 요청 전 토큰을 설정합니다.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터를 사용하여 토큰을 갱신합니다.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await api.post('/auth/refresh-token', { token: refreshToken });
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
