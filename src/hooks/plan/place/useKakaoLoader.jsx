import { useKakaoLoader as useKakaoLoaderOrigin } from 'react-kakao-maps-sdk';

/** 카카오 MAP 생성 함수  */
const useKakaoLoader = () => {
  useKakaoLoaderOrigin({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
    libraries: ['clusterer', 'services'],
  });
};

export default useKakaoLoader;
