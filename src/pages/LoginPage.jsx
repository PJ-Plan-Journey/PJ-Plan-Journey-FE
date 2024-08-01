import React, { useState } from 'react';
import {
  PageContainer,
  ContentContainer,
  Form,
  Input,
  Button,
  KakaoButton,
  SignUpText,
  InputContainer,
  InputWrapper,
  InputLabel,
  KakaoLogoImage,
  SignUpPrompt,
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
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setUser(response.data.user);
      console.log('Login successful:', response.data);
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed:', error);
    }
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
          <KakaoButton>
            <KakaoLogoImage src={KakaoLogo} alt="Kakao Logo" />
            카카오톡으로 시작하기
          </KakaoButton>
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginPage;
