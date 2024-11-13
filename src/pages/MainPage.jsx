import React from "react";
import { MainContainer } from "@styles/main/MainPage.style";
import Header from "@Header/Header";
import TravelRecommendations from "@components/main/TravelRecommendations";

const MainPage = () => {
  return (
    <MainContainer>
      <Header />
      <TravelRecommendations />
    </MainContainer>
  );
};

export default MainPage;
