// src/pages/SignupPage.jsx
import React from 'react';
import * as S from '@styles/auth/Signup.styles'; // 스타일 경로
import Header from '@Header/Header';
import {
  LoginText,
  HighlightText,
} from '@styles/main/TravelRecommendations.style';

import SignupForm from '@auth/SignupForm';


const SignupPage = () => {
  return (
    <S.PageContainer>
      <Header />
      <LoginText>
        <HighlightText>PlanJourney</HighlightText>에 오신것을
        <br />
        환영합니다.
      </LoginText>
      <S.ContentContainer>
        <SignupForm /> {/* SignupForm 컴포넌트 사용 */}
        
        {/* 로그인 페이지로 이동 */}
        <S.SignUpText onClick={() => (window.location.href = '/login')}>
          로그인
        </S.SignUpText>
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default SignupPage;
