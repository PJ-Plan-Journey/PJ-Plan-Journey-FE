import React from 'react';
import { MdShare } from 'react-icons/md';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

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

const ShareButton = () => {
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const handleShare = (e) => {
    e.stopPropagation(); // 이벤트 전파 중지
    navigate('/board'); // '/board' 경로로 리디렉션
  };

  return (
    <StyledShareButton onClick={handleShare}>
      <MdShare /> 공유하기
    </StyledShareButton>
  );
};

export default ShareButton;
