import { FaCheck as CheckIcon } from '@react-icons/all-files/fa/FaCheck';
import * as S from '@styles/plan/Step.style';
import useStepStore from '@zustands/plan/useStepStore';
import useModal from '@hooks/useModal';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';

const STEPLIST = [{ name: '여행 일정 등록' }, { name: '여행 장소 등록' }];

const Step = () => {
  const { step, setStep } = useStepStore();
  const { isOpen, openModal, closeModal, Modal, Title, Content } = useModal();
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const moveStep = (index) => {
    setStep(index + 1);
  };

  const onClickLogo = () => {
    openModal();
  };

  return (
    <S.Container>
      <S.StepList>
        <S.Logo onClick={onClickLogo} />

        {STEPLIST.map((item, index) => (
          <S.Item
            key={index}
            $status={String(index + 1 === step)}
            onClick={() => moveStep(index)}
          >
            <span className="step-number">
              {index + 1 < step ? <CheckIcon /> : `step ${index + 1}`}
            </span>

            <span>{item.name}</span>
          </S.Item>
        ))}
      </S.StepList>

      {step < 3 && <Button onClick={nextStep}>다음</Button>}

      {isOpen && (
        <Modal closeModal={closeModal} onConfirm={() => navigate(-1)}>
          <Title>
            <div>변경 사항이 저장되지 않았습니다.</div>
          </Title>
          <Content>
            <div>
              저장되지 않은 변경사항이 있습니다. 변경사항을 저장하지 않으면
              데이터가 사라질 수 있습니다.
            </div>
          </Content>
        </Modal>
      )}
    </S.Container>
  );
};

export default Step;
