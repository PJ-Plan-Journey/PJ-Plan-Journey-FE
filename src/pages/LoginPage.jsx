// src/pages/LoginPage.jsx
import React from 'react';
import * as S from '@styles/auth/Login.styles'; // 스타일 경로
import Header from "@Header/Header";
import {
  LoginText,
  HighlightText,
} from '@styles/main/TravelRecommendations.style';
import LoginForm from '@auth/LoginForm'; // LoginForm 컴포넌트 임포트

const LoginPage = () => {
  return (
    <S.PageContainer>
      <Header />
      <LoginText>
        안녕하세요.
        <br />
        <HighlightText>Plan Journey</HighlightText> 입니다 :)
        <br />
        <br />
        로그인
      </LoginText>
      <S.ContentContainer>
        <LoginForm /> {/* LoginForm 컴포넌트 사용 */}
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default LoginPage;
