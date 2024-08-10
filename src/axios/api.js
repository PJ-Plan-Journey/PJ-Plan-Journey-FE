// src/axios/api.js
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL, // 프록시 설정에 맞춰 baseURL 사용
  withCredentials: true,
});

// 로그아웃 처리 유틸리티
const handleLogout = async () => {
  try {
    await api.post('/users/logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login'; // 로그아웃 후 로그인 페이지로 리디렉션
  } catch (error) {
    console.error('로그아웃 실패:', error);
    alert('로그아웃에 실패했습니다.');
  }
};

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // const userId = 1;

    // if (userId) {
    //   config.headers['USERID'] = userId; // 사용자 ID를 헤더에 추가
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  // async (error) => {
  //   const originalRequest = error.config;
  //   if (
  //     error.response &&
  //     error.response.status === 401 &&
  //     !originalRequest._retry
  //   ) {
  //     originalRequest._retry = true;
  //     const refreshToken = localStorage.getItem('refreshToken');
  //     if (refreshToken) {
  //       try {
  //         const { data } = await api.post('/auth/refresh', { refreshToken });
  //         localStorage.setItem('accessToken', data.accessToken);
  //         originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
  //         return api(originalRequest);
  //       } catch (err) {
  //         console.error('리프레시 토큰을 통한 액세스 토큰 재발급 실패:', err);
  //         handleLogout();
  //       }
  //     } else {
  //       handleLogout();
  //     }
  //   }
  //   return Promise.reject(error);
  // }
);

export default api;
export { handleLogout };
