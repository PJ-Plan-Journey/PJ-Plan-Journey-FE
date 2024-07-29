import React from 'react';
import { LoginContainer } from '@styles/auth/Login.styles';
import LoginForm from '@components/auth/LoginForm';
import KakaoLoginButton from '@components/auth/KakaoLoginButton';

const LoginPage = () => {
  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm />
      <KakaoLoginButton />
    </LoginContainer>
  );
};

export default LoginPage;
