import React from 'react';
import { TravelContainer, LoginText, MenuText, DayButton } from '@styles/mypage/TravelManagement.styles';

const TravelManagement = ({ days }) => (
  <TravelContainer>
    <LoginText>일정관리</LoginText>
    <MenuText>나의 여행</MenuText>
    {days.map((day, index) => (
      <DayButton key={index} onClick={() => alert(`${day} 클릭`)}>{day}</DayButton>
    ))}
  </TravelContainer>
);

export default TravelManagement;
