import React from 'react';
import { MdShare } from 'react-icons/md';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // useMutation과 useQueryClient 추가
import api from '@axios/api';

const StyledShareButton = styled.button`
  background-color: ${(props) => (props.disabled ? '#a0a0a0' : '#156BF0')};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#a0a0a0' : '#0056b3')};
  }
`;

const ShareButton = ( { planId }) => { // planId를 props로 받아옴
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // queryClient 초기화
  console.log(planId)
  const publishPlanMutation = useMutation({
    mutationFn: (planId) => api.patch(`/plans/${planId}/publish`), // 일정 공개 API 호출
    onSuccess: () => {
      alert('일정이 성공적으로 공개되었습니다.');
      queryClient.invalidateQueries(['sharedPlans']); // 공유된 일정 목록을 다시 불러옴
      navigate('/board'); // '/board' 경로로 리디렉션
    },
    onError: (error) => {
      console.error('일정 공개에 실패했습니다.', error);
      alert('일정 공개에 실패했습니다.');
    },
  });

  const handleShare = (e,planId) => {
    e.stopPropagation(); // 이벤트 전파 중지
    publishPlanMutation.mutate(planId); // API 호출
  };

  return (
    <StyledShareButton onClick={(e) => handleShare(e,planId)}>
      <MdShare /> 공유하기
    </StyledShareButton>
  );
};

export default ShareButton;
