// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import {
  PageContainer,
  ContentContainer,
  Form,
  Input,
  Button,
  KakaoButton,
  SignUpPrompt,
  InputContainer,
  InputWrapper,
  InputLabel,
  KakaoLogoImage,
  SignUpLink,
} from '@styles/auth/Login.styles';
import api from '@axios/api';
import useBearStore from '@zustands/bearStore';
import Header from "@Header/Header";
import {
  LoginText,
  HighlightText,
} from '@styles/main/TravelRecommendations.style';
import KakaoLogo from '@assets/Kakao_logo.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useBearStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken } = response.data;

      // 액세스 토큰을 로컬 스토리지에 저장
      localStorage.setItem('accessToken', accessToken);

      // 사용자 정보를 Zustand 상태에 저장
      setUser(response.data.user);
      console.log('Login successful:', response.data);

      // 로그인 후 메인 페이지로 이동
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
    }
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
    <PageContainer>
      <Header />
      <LoginText>
        안녕하세요.
        <br />
        <HighlightText>Plan Journey</HighlightText> 입니다 :)
        <br />
        <br />
        로그인
      </LoginText>
      <ContentContainer>
        <Form onSubmit={handleLogin}>
          <InputContainer>
            <InputWrapper>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <InputLabel htmlFor="email">e-mail을 입력해주세요</InputLabel>
            </InputWrapper>
            <InputWrapper>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <InputLabel htmlFor="password">비밀번호를 입력해주세요</InputLabel>
            </InputWrapper>
            <SignUpPrompt>
              처음이신가요? <SignUpLink onClick={() => window.location.href = '/signup'}>회원가입하기</SignUpLink>
            </SignUpPrompt>
          </InputContainer>
          <Button type="submit">로그인</Button>
          <KakaoButton onClick={handleKakaoLogin}>
            <KakaoLogoImage src={KakaoLogo} alt="Kakao Logo" />
            카카오톡으로 시작하기
          </KakaoButton>
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginPage;
