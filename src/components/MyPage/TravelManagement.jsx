import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as S from '@styles/mypage/TravelManagement.styles';
import api from '@axios/api';
import ShareButton from '@components/MyPage/ShareButton';

const TravelManagement = () => {
  const queryClient = useQueryClient();

  // 여행 데이터 가져오기
  const {
    data: travels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['travels'],
    queryFn: () => api.get('/users/mypage').then((res) => res.data.data),
  });
  console.log(travels);
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>여행 데이터를 불러오는 중에 오류가 발생했습니다.</p>;
  }

  console.log({ travels });

  return (
    <S.TravelContainer>
      <S.LoginText>나의 여행</S.LoginText>
      <S.TravelList>
        {travels.length > 0 ? (
          travels.map((travel, index) => (
            <S.TravelCard key={travel.planId || `travel-${index}`}>
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
                  <S.ScheduleLabel>최종수정</S.ScheduleLabel>{' '}
                  <S.DateLabel>
                    {new Date(travel.endDate).toLocaleDateString()}
                  </S.DateLabel>
                </S.LastModified>
                <S.ButtonContainer>
                  <ShareButton planId={travel.planId} />
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
