// src/auth/LoginForm.jsx
import React, { useState } from 'react';
import * as S from '@styles/auth/Login.styles'; // 스타일 경로
import api from '@axios/api';
import { useMutation } from '@tanstack/react-query';
import useBearStore from '@zustands/bearStore';
import KakaoLogo from '@assets/Kakao_logo.jpg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useBearStore((state) => state.setUser);

  const mutation = useMutation(
    (data) => api.post('/auth/login', data),
    {
      onSuccess: (response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(response.data.user);
        console.log('Login successful:', response.data);
        window.location.href = '/';
      },
      onError: (error) => {
        console.error('Login failed:', error);
        alert('로그인에 실패했습니다.');
      }
    }
  );

  const handleLogin = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log('카카오 로그인 성공', authObj);
        // 사용자 정보 요청
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log('카카오 사용자 정보', res);
            // TODO: 서버로 사용자 정보를 보내어 토큰 발급 및 세션 처리
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
