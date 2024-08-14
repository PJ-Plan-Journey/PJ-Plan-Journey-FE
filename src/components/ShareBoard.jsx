import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as S from '@styles/mypage/TravelManagement.styles';
import api from '@axios/api';

const ShareBoard = () => {
  const navigate = useNavigate();

  const getSharedPlans = async () => {
    try {
      const { data } = await api.get('/plans/shared'); // 모든 공유된 일정을 불러오는 API 호출
      return data;
    } catch (error) {
      console.error('Failed to fetch shared plans:', error);
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['sharedPlans'],
    queryFn: getSharedPlans,
  });

  if (isLoading) {
    return <p>데이터 로딩 중...</p>;
  }

  if (isError) {
    return <p>공유된 일정을 불러오는 중에 오류가 발생했습니다.</p>;
  }

  const handleCardClick = (planId) => {
    navigate(`/board/${planId}`);
  };

  return (
    <S.TravelContainer>
      <S.TravelList>
        {data?.map((plan) => (
          <S.TravelCard
            key={plan.planId}
            onClick={() => handleCardClick(plan.planId)}
          >
            <S.ImageContainer>
              <img
                src={'https://via.placeholder.com/150'}
                alt={plan.title}
              />
            </S.ImageContainer>
            <S.TravelInfo>
              <S.TravelName>{plan.title}</S.TravelName>
              <S.TravelDate>
                <S.ScheduleLabel>여행일자</S.ScheduleLabel>{' '}
                <S.DateLabel>
                  {plan.startDate} ~ {plan.endDate}
                </S.DateLabel>
              </S.TravelDate>
              <S.LastModified>
                <S.ScheduleLabel>생성일자</S.ScheduleLabel>{' '}
                <S.DateLabel>
                  {new Date(plan.createdAt).toLocaleDateString()}
                </S.DateLabel>
              </S.LastModified>
            </S.TravelInfo>
          </S.TravelCard>
        ))}
      </S.TravelList>
    </S.TravelContainer>
  );
};

export default ShareBoard;
