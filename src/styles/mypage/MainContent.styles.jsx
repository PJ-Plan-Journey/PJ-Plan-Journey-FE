import styled from 'styled-components';

export const MainContentWrapper = styled.div`
  flex-grow: 1;
  padding: 1rem;
  margin-left: 220px; /* MenuContainer의 너비만큼 추가 마진 */
  max-height: calc(100vh - 3cm - 2rem); /* 전체 화면 높이에서 Header와 padding을 뺀 높이 */
  overflow-y: auto;
`;

export const LoginText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const MenuText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const DayButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #156BF0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;
