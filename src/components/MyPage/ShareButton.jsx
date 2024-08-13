// src/components/MyPage/ShareButton.jsx
import React from 'react';
import { MdShare } from 'react-icons/md';
import styled from 'styled-components';

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
  gap: 0.5rem; /* 아이콘과 텍스트 사이 간격 */
  
  &:hover {
    background-color: ${(props) => (props.disabled ? '#a0a0a0' : '#0056b3')};
  }
`;

const ShareButton = ({ planId }) => {
  const handleShare = () => {
    window.location.href = `/board/${planId}`; // 공유 페이지로 리디렉션
  };

  return (
    <StyledShareButton onClick={handleShare}>
      <MdShare /> 공유하기
    </StyledShareButton>
  );
};

export default ShareButton;
