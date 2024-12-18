import React, { useState, useEffect } from 'react';
import * as S from '@styles/auth/Login.styles';
import api from '@axios/api';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@zustands/useAuthStore';
import KakaoLogo from '@assets/Kakao_logo.jpg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_APP_KEY); // .env 파일의 Kakao 앱 키 사용
      }
    } else {
      console.log('Kakao SDK가 로드되지 않았습니다.');
    }
  }, []);

  const doKakaoLogin = () => {
    const url =
      'https://kauth.kakao.com/oauth/authorize?client_id=' +
      import.meta.env.VITE_KAKAO_APP_KEY +
      '&redirect_uri=' +
      import.meta.env.VITE_KAKAO_REDIRECT_URI +
      '&response_type=code&scope=account_email,birthday,gender,profile_nickname,profile_image';

    window.location.href = url;
  };

  const mutation = useMutation({
    mutationFn: (data) => api.post('/users/login', data),
    onSuccess: ({ data }) => {
      console.log('Response headers:', { data });

      const accessToken = data.data.accessToken?.split(' ')[1];
      const refreshToken = data.data.refreshToken;

      const user = data.data;

      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        login(user, accessToken, refreshToken);
      } else {
        console.error('토큰이 헤더에 없습니다.');
      }
      window.location.href = '/';
    },
    onError: (error) => {
      console.log('Login failed:', error);
      alert('로그인에 실패했습니다.');
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert('Kakao SDK가 로드되지 않았습니다.');
      return;
    }

    doKakaoLogin(); // 카카오 로그인 함수 호출
  };

  return (
    <S.Form onSubmit={handleLogin}>
      <S.InputContainer>
        <S.InputWrapper>
          <S.Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <S.InputLabel htmlFor="email">e-mail을 입력해주세요</S.InputLabel>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
          />
          <S.InputLabel htmlFor="password">
            비밀번호를 입력해주세요
          </S.InputLabel>
        </S.InputWrapper>
        <S.SignUpPrompt>
          처음이신가요?{' '}
          <S.SignUpLink onClick={() => (window.location.href = '/signup')}>
            회원가입하기
          </S.SignUpLink>
        </S.SignUpPrompt>
      </S.InputContainer>
      <S.Button type="submit">로그인</S.Button>
      <S.KakaoButton onClick={handleKakaoLogin}>
        <S.KakaoLogoImage src={KakaoLogo} alt="Kakao Logo" />
        카카오톡으로 시작하기
      </S.KakaoButton>
    </S.Form>
  );
};

export default LoginForm;
