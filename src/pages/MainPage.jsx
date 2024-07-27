import React from 'react';
import styled from 'styled-components';
import Header from '@components/Header';
import BrandSection from '@components/BrandSection';
import TravelRecommendations from '@components/TravelRecommendations';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <BrandSection />
      <TravelRecommendations />
    </MainContainer>
  );
};

export default MainPage;
