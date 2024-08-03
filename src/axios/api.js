// src/axios/api.js
import axios from 'axios';

// 로그아웃 처리 유틸리티
const handleLogout = () => {
  localStorage.removeItem('accessToken');
  // 쿠키에서 리프레시 토큰을 삭제하거나, 서버에 로그아웃 요청을 보낼 수 있습니다.
  window.location.href = '/login'; // 로그아웃 후 로그인 페이지로 리디렉션
};

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'https://yourapi.example.com', // 실제 백엔드 URL로 변경하세요.
  withCredentials: true, // 쿠키를 사용하려면 이 옵션을 활성화해야 합니다.
});

// 요청 인터셉터
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

// 응답 인터셉터
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await api.post('/auth/token'); // 새로운 액세스 토큰 요청
        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('리프레시 토큰을 통한 액세스 토큰 재발급 실패:', err);
        handleLogout(); // 실패 시 로그아웃 처리
      }
    }
    return Promise.reject(error);
  }
);

export default api;
