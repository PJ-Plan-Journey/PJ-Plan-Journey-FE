import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import * as S from '@styles/mypage/TravelManagement.styles';
import api from '@axios/api';
import ShareButton from '@components/MyPage/ShareButton';

const TravelManagement = () => {
  const navigate = useNavigate(); // useNavigate 훅 초기화
  const {
    data: travels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travels'],
    queryFn: () => api.get('/users/mypage').then((res) => res.data.data),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>여행 데이터를 불러오는 중에 오류가 발생했습니다.</p>;
  }

  const handleCardClick = (planId) => {
    navigate(`/board/${planId}`); // 해당 planId로 리디렉션
  };

  return (
    <S.TravelContainer>
      <S.TravelList>
        {travels.length > 0 ? (
          travels.map((travel, index) => (
            <S.TravelCard
              key={travel.planId || `travel-${index}`}
              onClick={() => handleCardClick(travel.planId)} // onClick 이벤트 추가
            >
              <S.ImageContainer>
                <img
                  src={'https://via.placeholder.com/150'}
                  alt={travel.title}
                />
              </S.ImageContainer>
              <S.TravelInfo>
                <S.TravelName>{travel.title}</S.TravelName>
                <S.TravelDate>
                  <S.ScheduleLabel>여행일자</S.ScheduleLabel>{' '}
                  <S.DateLabel>
                    {travel.startDate} ~ {travel.endDate}
                  </S.DateLabel>
                </S.TravelDate>
                <S.LastModified>
                  <S.ScheduleLabel>생성일자</S.ScheduleLabel>{' '}
                  <S.DateLabel>
                    {new Date(travel.createdAt).toLocaleDateString()}
                  </S.DateLabel>
                </S.LastModified>
                <S.ButtonContainer>
                  <ShareButton onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 중단
                    handleCardClick(travel.planId); // 공유 버튼을 통해 리디렉션
                  }} />
                </S.ButtonContainer>
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
