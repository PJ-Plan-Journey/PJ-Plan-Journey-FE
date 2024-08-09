// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import * as S from '@styles/auth/Login.styles';
import api from '@axios/api';
import { useMutation } from '@tanstack/react-query';
import useAuthStore from '@zustands/useAuthStore';
import KakaoLogo from '@assets/Kakao_logo.jpg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useAuthStore((state) => state.login);

  const mutation = useMutation({
    mutationFn: (data) => api.post('/users/login', data),
    onSuccess: (response) => {
      console.log('Response headers:', response.headers);
  
      // 헤더에서 토큰을 추출
      const accessToken = response.headers['authorization']?.split(' ')[1];
      const refreshToken = response.headers['refresh-token'];
  
      // 유저 정보는 여전히 response.data.data에서 가져옵니다.
      const user = response.data.data;
  
      // 토큰이 존재하면 로컬 스토리지에 저장하고 로그인 처리
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
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log('카카오 로그인 성공', authObj);
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log('카카오 사용자 정보', res);
            const user = {
              email: res.kakao_account.email,
              nickname: res.properties.nickname,
            };
            login(user);
            window.location.href = '/';
          },
          fail: (error) => {
            console.error('카카오 사용자 정보 요청 실패', error);
          },
        });
      },
      fail: (err) => {
        console.error('카카오 로그인 실패', err);
      },
    });
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
          <S.InputLabel htmlFor="password">비밀번호를 입력해주세요</S.InputLabel>
        </S.InputWrapper>
        <S.SignUpPrompt>
          처음이신가요? <S.SignUpLink onClick={() => window.location.href = '/signup'}>회원가입하기</S.SignUpLink>
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
