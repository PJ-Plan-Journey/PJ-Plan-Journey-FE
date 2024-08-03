// src/pages/SignupPage.jsx

import React, { useState } from 'react';
import * as S from '@styles/auth/Signup.styles'; // 스타일 경로
import api from '@axios/api';
import Header from '@Header/Header';
import {
  LoginText,
  HighlightText,
} from '@styles/main/TravelRecommendations.style';
import { useMutation } from '@tanstack/react-query';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const signupMutation = useMutation(
    (data) => api.post('/auth/signup', data),
    {
      onSuccess: (response) => {
        console.log('Signup successful:', response.data);
        window.location.href = '/login';
      },
      onError: (error) => {
        console.error('Signup failed:', error);
        alert('회원가입에 실패했습니다.');
      }
    }
  );

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    signupMutation.mutate({ firstName, email, password });
  };

  const handleEmailVerification = async () => {
    try {
      await api.post('/auth/send-verification-email', { email });
      setEmailSent(true);
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error('Email verification failed:', error);
      alert('인증 코드 전송에 실패했습니다.');
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
      alert('이메일 인증에 실패했습니다.');
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
    <S.PageContainer>
      <Header />
      <LoginText>
        <HighlightText>PlanJourney</HighlightText>에 오신것을
        <br />
        환영합니다.
      </LoginText>
      <S.ContentContainer>
        <S.Form onSubmit={handleSignup}>
          <S.InputContainer>
            {/* 이름 입력 필드 */}
            <S.InputWrapper>
              <S.Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder=" "
              />
              <S.InputLabel htmlFor="firstName">이름을 입력해주세요.</S.InputLabel>
            </S.InputWrapper>
            
            {/* 이메일 입력 및 인증 버튼 */}
            <S.EmailContainer>
              <S.InputWrapper>
                <S.Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                />
                <S.InputLabel htmlFor="email">name@example.com</S.InputLabel>
              </S.InputWrapper>
              <S.EmailButton type="button" onClick={handleEmailVerification}>
                인증
              </S.EmailButton>
            </S.EmailContainer>

            {/* 이메일 인증 코드 입력 및 확인 버튼 */}
            {emailSent && (
              <S.InputWrapper>
                <S.Input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder=" "
                />
                <S.InputLabel htmlFor="verificationCode">인증 코드를 입력해주세요.</S.InputLabel>
                <S.EmailButton type="button" onClick={handleVerifyCode}>
                  확인
                </S.EmailButton>
              </S.InputWrapper>
            )}

            {/* 비밀번호 및 비밀번호 확인 입력 필드 */}
            <S.InputWrapper>
              <S.Input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder=" "
              />
              <S.InputLabel htmlFor="password">암호</S.InputLabel>
            </S.InputWrapper>
            <S.InputWrapper>
              <S.Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder=" "
                className={!passwordMatch && confirmPassword ? 'error' : ''}
              />
              <S.InputLabel htmlFor="confirmPassword">암호 확인</S.InputLabel>
            </S.InputWrapper>
          </S.InputContainer>

          {/* 회원가입 버튼 */}
          <S.Button type="submit">회원가입</S.Button>
        </S.Form>
        
        {/* 로그인 페이지로 이동 */}
        <S.SignUpText onClick={() => (window.location.href = '/login')}>
          로그인
        </S.SignUpText>
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default SignupPage;
