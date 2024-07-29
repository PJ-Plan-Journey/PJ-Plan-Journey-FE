import React from 'react';
import CustomCalendar from '@components/plan/date/CustomCalendar';
import styled from 'styled-components';
import useDateStore from '@/zustands/plan/useDateStore';
import { flex } from '@styles/common/common.style';

const Container = styled.div`
  width: inherit;
  height: inherit;
`;

const BackGound = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;

  h1 {
    font-size: 40px;
    padding: 30px 0 50px;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 50px;
  ${flex}
  justify-content: right;
  gap: 20px;

  button {
    cursor: pointer;
    width: 150px;
    border: none;
    background-color: #156bf0;
    color: white;
    ${flex};
    justify-content: center;
    padding: 15px 0;
    border-radius: 30px;
    font-size: 18px;

    &.cancel {
      background-color: #c2c2c2;
    }
  }
`;

const CalendarModal = ({ toggle }) => {
  const { setDates } = useDateStore();

  const resetDates = () => {
    setDates({
      startDate: null,
      endDate: null,
    });
  };

  return (
    <Container>
      <BackGound />
      <Modal>
        <h1>여행 기간을 설정해주세요.</h1>

        <CustomCalendar />
        <ButtonGroup>
          <button className="cancel" onClick={resetDates}>
            초기화
          </button>
          <button onClick={toggle}>확인</button>
        </ButtonGroup>
      </Modal>
    </Container>
  );
};

export default CalendarModal;
