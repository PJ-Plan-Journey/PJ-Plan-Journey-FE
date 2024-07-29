import React, { useState } from 'react';
import { SignupContainer, SignupForm, Input, Button } from '@styles/auth/Signup.styles';
import axios from '@axios/api';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/signup', { email, password });
      console.log('Signup successful:', response.data);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <SignupContainer>
      <h1>Signup Page</h1>
      <SignupForm onSubmit={handleSignup}>
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
        <Button type="submit">Signup</Button>
      </SignupForm>
      <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
    </SignupContainer>
  );
};

export default SignupPage;
