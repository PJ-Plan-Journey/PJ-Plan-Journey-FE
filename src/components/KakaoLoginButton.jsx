import React from 'react';
import { Button } from '@styles/Profile.styles';

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    console.log('Kakao login clicked');
    // 실제 카카오 로그인 로직 추가
  };

  return <Button onClick={handleKakaoLogin}>Login with Kakao</Button>;
};

export default KakaoLoginButton;
