import React, { useState } from 'react';
import { PageContainer, ContentContainer, Form, Input, Button, KakaoButton, SignUpText, InputContainer, InputWrapper, InputLabel } from '@styles/auth/Login.styles';
import axios from '@axios/api';
import useBearStore from '@zustands/bearStore';
import Header from '@components/common/Header';
import { LoginText } from '@styles/main/TravelRecommendations.style';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useBearStore((state) => state.setUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      setUser(response.data.user);
      console.log('Login successful:', response.data);
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
        Plan Journey 입니다 :)
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
              <InputLabel htmlFor="email">E-mail을 입력해주세요</InputLabel>
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
          </InputContainer>
          <Button type="submit">로그인</Button>
          <KakaoButton>Login with Kakao</KakaoButton>
        </Form>
        <SignUpText onClick={() => window.location.href = '/signup'}>회원가입</SignUpText>
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginPage;
