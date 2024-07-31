import React from 'react';
import CustomCalendar from '@components/plan/date/CustomCalendar';
import useDateStore from '@zustands/plan/useDateStore';
import Modal from '../Modal';
import useModal from '@hooks/useModal';
import * as S from '@styles/plan/date/CalendarModal.style';

const CalendarModal = ({ closeCalendar }) => {
  const { setDates, startDate, endDate } = useDateStore();
  const { isError, message, showError, hideError } = useModal();

  const onClick = () => {
    if (!startDate || !endDate) {
      return showError('일정을 선택해주세요.');
    }

    closeCalendar();
  };

  const resetDates = () => {
    setDates({
      startDate: null,
      endDate: null,
    });
  };

  return (
    <S.CalendarModalContainer>
      <div className="background" />
      <S.ModalBox>
        <h1>여행 기간을 설정해주세요.</h1>

        <CustomCalendar />
        <S.ButtonGroup>
          <button className="cancel" onClick={resetDates}>
            초기화
          </button>
          <button onClick={onClick}>확인</button>
        </S.ButtonGroup>
      </S.ModalBox>

      {isError && (
        <Modal type="error" onConfirm={hideError}>
          {message}
        </Modal>
      )}
    </S.CalendarModalContainer>
  );
};

export default CalendarModal;
