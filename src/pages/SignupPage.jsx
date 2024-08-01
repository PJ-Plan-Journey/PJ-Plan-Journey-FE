// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import {
  PageContainer,
  ContentContainer,
  Form,
  Input,
  Button,
  SignUpText,
  InputContainer,
  InputWrapper,
  InputLabel,
  EmailContainer,
  EmailButton,
} from '@styles/auth/Signup.styles';
import api from '@axios/api';
import Header from '@Header/Header';
import {
  LoginText,
  HighlightText,
} from '@styles/main/TravelRecommendations.style';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await api.post('/auth/signup', { firstName, email, password });
      console.log('Signup successful:', response.data);
      // 회원가입 후 로그인 페이지로 이동
      window.location.href = '/login';
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleEmailVerification = async () => {
    try {
      await api.post('/auth/send-verification-email', { email });
      setEmailSent(true);
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error('Email verification failed:', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await api.post('/auth/verify-email', { email, verificationCode });
      if (response.data.success) {
        setIsEmailVerified(true);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('인증 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Email verification failed:', error);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  return (
    <PageContainer>
      <Header />
      <LoginText>
        <HighlightText>PlanJourney</HighlightText>에 오신것을
        <br />
        환영합니다.
      </LoginText>
      <ContentContainer>
        <Form onSubmit={handleSignup}>
          <InputContainer>
            {/* 이름 입력 필드 */}
            <InputWrapper>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder=" "
              />
              <InputLabel htmlFor="firstName">이름을 입력해주세요.</InputLabel>
            </InputWrapper>
            
            {/* 이메일 입력 및 인증 버튼 */}
            <EmailContainer>
              <InputWrapper>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                />
                <InputLabel htmlFor="email">name@example.com</InputLabel>
              </InputWrapper>
              <EmailButton type="button" onClick={handleEmailVerification}>
                인증
              </EmailButton>
            </EmailContainer>

            {/* 이메일 인증 코드 입력 및 확인 버튼 */}
            {emailSent && (
              <InputWrapper>
                <Input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder=" "
                />
                <InputLabel htmlFor="verificationCode">인증 코드를 입력해주세요.</InputLabel>
                <EmailButton type="button" onClick={handleVerifyCode}>
                  확인
                </EmailButton>
              </InputWrapper>
            )}

            {/* 비밀번호 및 비밀번호 확인 입력 필드 */}
            <InputWrapper>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder=" "
              />
              <InputLabel htmlFor="password">암호</InputLabel>
            </InputWrapper>
            <InputWrapper>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder=" "
                className={!passwordMatch && confirmPassword ? 'error' : ''}
              />
              <InputLabel htmlFor="confirmPassword">암호 확인</InputLabel>
            </InputWrapper>
          </InputContainer>

          {/* 회원가입 버튼 */}
          <Button type="submit">회원가입</Button>
        </Form>
        
        {/* 로그인 페이지로 이동 */}
        <SignUpText onClick={() => (window.location.href = '/login')}>
          로그인
        </SignUpText>
      </ContentContainer>
    </PageContainer>
  );
};

export default SignupPage;
