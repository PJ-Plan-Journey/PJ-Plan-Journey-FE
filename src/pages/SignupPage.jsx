import React from 'react';
import * as S from '@styles/auth/Signup.styles';
import Header from '@components/Header/Header'; // 경로 수정
import { LoginText, HighlightText } from '@styles/main/TravelRecommendations.style';
import SignupForm from '@components/auth/SignupForm';
import { Navigate } from 'react-router-dom';
import useAuthStore from '@zustands/authStore';

const SignupPage = () => {
  const { isLoggedIn } = useAuthStore((state) => ({
    isLoggedIn: state.isLoggedIn,
  }));

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <S.PageContainer>
      <Header />
      <LoginText>
        <HighlightText>PlanJourney</HighlightText>에 오신 것을
        <br />
        환영합니다.
      </LoginText>
      <S.ContentContainer>
        <SignupForm /> {/* SignupForm 컴포넌트 사용 */}
        <S.SignUpText onClick={() => (window.location.href = '/login')}>
          로그인
        </S.SignUpText>
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default SignupPage;
