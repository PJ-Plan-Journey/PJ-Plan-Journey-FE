import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import * as S from '@styles/mypage/TravelManagement.styles';
import api from '@axios/api';
import PlaceholderImage from '@assets/150x150.png';

const ShareBoard = () => {
  const navigate = useNavigate();

  const getSharedPlans = async ({ pageParam = 0 }) => {
    try {
      const { data } = await api.get(`/plans?page=${pageParam}&size=10`);
      return {
        data: data.data.content, // 여기에서 data 구조를 확인하세요.
        nextPage: pageParam + 1,
        isLast: data.data.content.length === 0,
      };
    } catch (error) {
      console.error('공유된 일정을 가져오는 중 오류 발생:', error);
    }
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['sharedPlans'],
    queryFn: getSharedPlans,
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    onError: (error) => {
      console.log('일정을 불러오는 중 오류가 발생했습니다:', error);
    },
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
        {data?.pages.map((page, index) => {
          console.log('page.data:', page.data);
          
          if (!Array.isArray(page.data)) {
            console.error('page.data는 배열이 아닙니다:', page.data);
            return <p key={index}>데이터 형식이 올바르지 않습니다.</p>;
          }

          return page.data.map((plan) => (
            <S.TravelCard key={plan.planId} onClick={() => handleCardClick(plan.planId)}>
              <S.ImageContainer>
                <img src={PlaceholderImage} alt={plan.title} />
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
          ));
        })}
      </S.TravelList>
    </S.TravelContainer>
  );
};

export default ShareBoard;
