import React, { useState } from 'react';
import { LoginContainer, LoginForm, Input, Button } from '@styles/Login.styles';
import axios from '@axios/api';
import useBearStore from '@zustands/bearStore';
import KakaoLoginButton from '@components/KakaoLoginButton';

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
    <LoginContainer>
      <h1>Login Page</h1>
      <LoginForm onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
      </LoginForm>
      <KakaoLoginButton />
      <Button onClick={() => window.location.href = '/signup'}>Go to Signup</Button>
    </LoginContainer>
  );
};

export default LoginPage;
