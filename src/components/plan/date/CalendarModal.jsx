import CustomCalendar from '@components/plan/date/CustomCalendar';
import useDateStore from '@zustands/plan/useDateStore';
import useModal from '@hooks/useModal';
import * as S from '@styles/plan/date/CalendarModal.style';
import Button from '@components/common/Button';

const CalendarModal = ({ closeCalendar }) => {
  const { setDates, startDate, endDate } = useDateStore();
  const { isOpen, openModal, closeModal, Modal, Title, Content } = useModal();

  const onClick = () => {
    if (!startDate || !endDate) {
      openModal();
      return;
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
          <Button onClick={resetDates} variant="outline">
            초기화
          </Button>
          <Button onClick={onClick}>확인</Button>
        </S.ButtonGroup>
      </S.ModalBox>

      {isOpen && (
        <Modal closeModal={closeModal} type="info">
          <Title>일정을 선택해 주세요.</Title>
          <Content>여행 시작일과 종료일을 모두 선택해야 합니다.</Content>
        </Modal>
      )}
    </S.CalendarModalContainer>
  );
};

export default CalendarModal;
