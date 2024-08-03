import styled from 'styled-components';

export const TravelContainer = styled.div`
  line-height: 1.5;
`;

export const LoginText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const DayButtonWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 가로로 배치 */
  margin-bottom: 1rem;
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

export const DayContainer = styled.div`
  margin-left: 1rem;
  padding: 1rem;
  border-left: 3px solid #156BF0;
  margin-bottom: 1rem;
`;

export const ScheduleItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Dot = styled.span`
  height: 8px;
  width: 8px;
  background-color: #156BF0;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5rem;
`;
