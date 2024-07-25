import styled from 'styled-components';

// Calendar의 전체 컨테이너 스타일
export const CalendarContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
`;

// Header 스타일
export const Header = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 16px;
`;

// 각 날짜 셀 스타일
export const DateCell = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 4px;
  margin: 2px;
  cursor: pointer;
  background-color: ${props => (props.isToday ? '#f0f8ff' : 'transparent')};
  color: ${props => (props.isToday ? '#1e90ff' : '#000')};

  &:hover {
    background-color: #e0e0e0;
  }
`;
