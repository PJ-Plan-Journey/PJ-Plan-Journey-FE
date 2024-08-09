// src/components/MyPage/TravelManagement.jsx

import React from 'react';
import * as S from '@styles/mypage/TravelManagement.styles'; // 스타일 경로

const TravelManagement = () => {
  // 임시 데이터 설정
  const travels = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150', // 임시 이미지 URL
      name: '서울 투어',
      date: '2024.08.10',
      lastModified: '2024.08.02',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150', // 임시 이미지 URL
      name: '부산 여행',
      date: '2024.09.15',
      lastModified: '2024.09.05',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/150', // 임시 이미지 URL
      name: '제주도 탐험',
      date: '2024.10.20',
      lastModified: '2024.10.01',
    },
    // 더 많은 임시 데이터 추가 가능
  ];

  return (
    <S.TravelContainer>
      <S.LoginText>나의 여행</S.LoginText>
      <S.TravelList>
        {travels.length > 0 ? (
          travels.map((travel) => (
            <S.TravelCard
              key={travel.id}
              onClick={() => (window.location.href = `/travel/${travel.id}`)}
            >
              <S.ImageContainer>
                <img src={travel.image} alt={travel.name} />
              </S.ImageContainer>
              <S.TravelInfo>
                <S.TravelName>{travel.name}</S.TravelName>
                <S.TravelDate>
                  <S.ScheduleLabel>여행일자:</S.ScheduleLabel> {travel.date}
                </S.TravelDate>
                <S.LastModified>
                  <S.ScheduleLabel>최종 수정일:</S.ScheduleLabel>{' '}
                  {travel.lastModified}
                </S.LastModified>
              </S.TravelInfo>
            </S.TravelCard>
          ))
        ) : (
          <p>등록된 여행 일정이 없습니다.</p>
        )}
      </S.TravelList>
    </S.TravelContainer>
  );
};

export default TravelManagement;
