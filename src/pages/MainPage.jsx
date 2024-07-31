import React from 'react';
import { MainContainer } from '@styles/main/MainPage.style'; // 경로 확인
import Header from '@components/common/Header'; // 경로 확인
import TravelRecommendations from '@components/main/TravelRecommendations'; // 경로 확인

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <TravelRecommendations />
    </MainContainer>
  );
};

export default MainPage;
