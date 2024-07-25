import React from 'react';
import styled from 'styled-components';
import Header from '@components/Header';
import BrandSection from '@components/BrandSection';
import Containers from '@components/Containers';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContainerWrapper = styled.div`
  display: flex;
  gap: 1.5cm; /* 초기 간격 */
`;

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <Containers />
    </MainContainer>
  );
};

export default MainPage;
