// src/components/MyPage/TravelManagement.jsx

import React, { useState } from 'react';
import * as S from '@styles/mypage/TravelManagement.styles'; // 스타일 경로

const TravelManagement = () => {
  // 초기 상태로 임시 데이터를 설정
  const [days, setDays] = useState([
    'Day 1: 서울 관광',
    'Day 2: 부산 해운대',
    'Day 3: 제주도 올레길',
  ]);

  // 각 Day의 일정 데이터
  const schedule = {
    'Day 1': [
      '일어나서 물 한컵 마시기',
      '아침 식사 전 조깅 30분 하기',
      '서울타워 방문',
    ],
    'Day 2': [
      '해운대 해변 산책',
      '광안리 해수욕장 방문',
      '해운대 근처 카페 탐방',
    ],
    'Day 3': [
      '제주도 올레길 탐방',
      '성산일출봉 방문',
      '제주도 흑돼지 맛집 탐방',
    ],
  };

  // 새로운 여행 일정을 추가하는 함수
  const addDay = () => {
    const newDay = `Day ${days.length + 1}`;
    setDays((prevDays) => [...prevDays, newDay]);
    schedule[newDay] = [
      `${newDay} 일정 1`,
      `${newDay} 일정 2`,
      `${newDay} 일정 3`,
    ]; // 임시 일정 추가
  };

  return (
    <S.TravelContainer>
      <S.LoginText>나의 여행</S.LoginText>
      <S.DayButtonWrapper>
        {days.map((day, index) => (
          <S.DayButton key={index} onClick={() => alert(`${day} 클릭`)}>
            {day}
          </S.DayButton>
        ))}
        {/* 새로운 여행 일정을 추가하는 버튼 */}
        <S.DayButton onClick={addDay}>Add New Day</S.DayButton>
      </S.DayButtonWrapper>
      {days.map((day, index) => (
        <S.DayContainer key={index}>
          {schedule[day] &&
            schedule[day].map((item, idx) => (
              <S.ScheduleItem key={idx}>
                <S.Dot />
                {item}
              </S.ScheduleItem>
            ))}
        </S.DayContainer>
      ))}
    </S.TravelContainer>
  );
};

export default TravelManagement;
