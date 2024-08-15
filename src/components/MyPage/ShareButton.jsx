import React, { useState } from 'react';
import { MdShare } from 'react-icons/md';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query'; 
import api from '@axios/api';

const StyledShareButton = styled.button`
  background-color: ${(props) => (props.isPublished ? '#FF6347' : '#156BF0')}; /* isPublished에 따라 색상 변경 */
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${(props) => (props.isPublished ? '#FF4500' : '#0056b3')}; /* Hover 시 색상 변경 */
  }
`;

const ShareButton = ({ planId, isPublished: initialPublishedState }) => { // planId와 초기 isPublished 상태를 받아옴
  const [isPublished, setIsPublished] = useState(initialPublishedState); // 로컬 상태로 isPublished 관리
  const navigate = useNavigate();
  const queryClient = useQueryClient(); 

  const publishPlanMutation = useMutation({
    mutationFn: () => api.patch(`/plans/${planId}/publish`), 
    onSuccess: () => {
      alert('일정이 성공적으로 공개되었습니다.');
      queryClient.invalidateQueries(['sharedPlans']); 
      setIsPublished(true); // 성공 시 상태 변경
      navigate('/board'); 
    },
    onError: (error) => {
      console.error('일정 공개에 실패했습니다.', error);
      alert('일정 공개에 실패했습니다.');
    },
  });

  const unpublishPlanMutation = useMutation({
    mutationFn: () => api.patch(`/plans/${planId}/unpublish`), // 일정 비공개 API 호출
    onSuccess: () => {
      alert('일정 공개가 취소되었습니다.');
      queryClient.invalidateQueries(['sharedPlans']); 
      setIsPublished(false); // 성공 시 상태 변경
      navigate('/board'); 
    },
    onError: (error) => {
      console.error('일정 공개 취소에 실패했습니다.', error);
      alert('일정 공개 취소에 실패했습니다.');
    },
  });

  const handleShare = (e) => {
    e.stopPropagation(); 
    if (isPublished) {
      unpublishPlanMutation.mutate(); // 공개 취소
    } else {
      publishPlanMutation.mutate(); // 공개
    }
  };

  return (
    <StyledShareButton isPublished={isPublished} onClick={handleShare}>
      <MdShare /> {isPublished ? '취소하기' : '공유하기'}
    </StyledShareButton>
  );
};

export default ShareButton;
