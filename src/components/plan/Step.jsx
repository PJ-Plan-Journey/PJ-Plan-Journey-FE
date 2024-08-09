import { FaCheck as CheckIcon } from 'react-icons/fa6';
import * as S from '@styles/plan/Step.style';
import useStepStore from '@zustands/plan/useStepStore';
import useModal from '@hooks/useModal';
import Modal from '@components/plan/Modal';
import { useNavigate } from 'react-router-dom';

const STEPLIST = [{ name: '여행 일정 등록' }, { name: '여행 장소 등록' }];

const Step = () => {
  const { step, setStep } = useStepStore();
  const { isError, message, showError, hideError } = useModal();
  const navigate = useNavigate();

  const nextStep = () => {
    setStep(step + 1);
  };

  const moveStep = (index) => {
    setStep(index + 1);
  };

  const onClickLogo = () => {
    showError('변경사항이 저장되지 않을 수 있습니다.');
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

      {step < 3 && <S.Button onClick={nextStep}>다음</S.Button>}

      {isError && (
        <Modal onCancel={hideError} onConfirm={() => navigate('/')}>
          {message}
        </Modal>
      )}
    </S.Container>
  );
};

export default Step;
