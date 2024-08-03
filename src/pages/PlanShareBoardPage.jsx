import React from 'react';
import Header from "@Header/Header";
import PlanShareBoard from '@components/PlanShareBoard/PlanShareBoard'; // 경로 수정
import { LoginText } from '@styles/main/TravelRecommendations.style'; // 경로 및 내보내기 확인

const PlanShareBoardPage = () => {
  return (
    <>
      <Header />
      <LoginText>Plan Share Board</LoginText> {/* 예시로 추가 */}
      <PlanShareBoard />
    </>
  );
};

export default PlanShareBoardPage;
