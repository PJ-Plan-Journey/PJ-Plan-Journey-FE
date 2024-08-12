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

let retryCount = 0;
const MAX_RETRY = 1; // 재시도 횟수 제한

// 요청 인터셉터 설정
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

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => response,
  // async (error) => {
  //   const originalRequest = error.config;

  //   // 401 에러 발생 시 처리
  //   if (
  //     error.response &&
  //     error.response.status === 401 &&
  //     !originalRequest._retry &&
  //     retryCount < MAX_RETRY
  //   ) {
  //     originalRequest._retry = true; // 재시도 플래그 설정
  //     retryCount++; // 재시도 횟수 증가
  //     const accessToken = localStorage.getItem('accessToken');
  //     const refreshToken = localStorage.getItem('refreshToken');
  //     if (refreshToken) {
  //       try {
  //         // 리프레시 토큰을 사용해 새로운 액세스 토큰 요청
  //         const { data } = await api.post('/auth/refresh-token', {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`, // 왜 여기에 리프레시 넣음??
  //             RefreshToken: refreshToken,
  //           },
  //         });

  //         console.log(data)

  //         const newAccessToken = data.data;
  //         localStorage.setItem('accessToken', newAccessToken);
  //         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

  //         retryCount = 0; // 성공적으로 새 토큰을 받으면 재시도 횟수 초기화
  //         return api(originalRequest); // 원래 요청을 다시 시도
  //       } catch (err) {
  //         console.error('리프레시 토큰을 통한 액세스 토큰 재발급 실패:', err);
  //         retryCount = 0; // 재시도 실패 시 초기화하고 로그아웃
  //         // handleLogout(); // 재발급 실패 시 로그아웃 처리
  //       }
  //     } else {
  //       // handleLogout(); // 리프레시 토큰이 없으면 로그아웃 처리
  //     }
  //   }

  //   retryCount = 0; // 401 이외의 에러가 발생하면 재시도 횟수 초기화
  //   return Promise.reject(error);
  // }
);

export default api;
export { handleLogout };
