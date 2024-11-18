import { formatDate } from '@/utils/formatDate';
import AirTicket from './AirTicket';
import * as S from '@styles/plan/date/SelectDate.style';
import Button from '@components/common/Button';
import useStepStore from '@zustands/plan/useStepStore';
import useModal from '@hooks/useModal';

const SelectDate = ({ dates }) => {
  const { startDate, endDate, totalDays } = dates;
  const { isOpen, openModal, closeModal, Modal, Title, Content } = useModal();
  const { nextStep } = useStepStore();
  const FORMAT = 'yyyy년 MM월 dd일';

  const goToNextStep = () => {
    if (!startDate && !endDate) {
      openModal();
      return;
    }

    nextStep();
  };

  return (
    <>
      <S.Wrapper>
        <div className="city">서울</div>

        <div className="days">
          {startDate && endDate ? (
            <>
              <div>{formatDate(FORMAT, startDate)}</div>
              <div>-</div>
              <div>{formatDate(FORMAT, endDate)}</div>
              <span>({totalDays}일)</span>
            </>
          ) : (
            <div>일정을 선택해주세요.</div>
          )}
        </div>

        <Button onClick={goToNextStep}>다음</Button>
        <AirTicket />
      </S.Wrapper>

      {isOpen && (
        <Modal type="info" closeModal={closeModal}>
          <Title>일정을 선택해주세요.</Title>
          <Content>
            여행 일정을 선택하셔야 다음 단계로 진행할 수 있습니다.
          </Content>
        </Modal>
      )}
    </>
  );
};

export default SelectDate;
