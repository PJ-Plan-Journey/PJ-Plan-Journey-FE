import React from 'react';
import { LoginText, MenuText, DayButton } from '@styles/auth/MyPage.styles';

const TravelManagement = ({ days }) => {
  return (
    <>
      <LoginText>일정관리</LoginText>
      <MenuText>나의 여행</MenuText>
      {days.map((day, index) => (
        <DayButton key={index} onClick={() => alert(`${day} 클릭`)}>{day}</DayButton>
      ))}
    </>
  );
};

export default TravelManagement;
