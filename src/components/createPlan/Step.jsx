import { FaCircleCheck } from 'react-icons/fa6';
import * as S from '@styles/Step.style';
import useStepStore from '@zustand/useStepStore';

const STEPLIST = [
  { name: '날짜 선택' },
  { name: '장소 선택' },
  { name: '숙소 선택' },
];

const Step = () => {
  const { step, setStep } = useStepStore();

  return (
    <S.Container>
      <S.StepList>
        <S.Logo />

        {STEPLIST.map((item, index) => (
          <S.Item
            key={index}
            $status={String(index + 1 === step)}
            onClick={() => setStep(index + 1)}
          >
            {index + 1 < step ? <FaCircleCheck /> : `step ${index + 1}`}
            <span>{item.name}</span>
          </S.Item>
        ))}
      </S.StepList>

      <S.Button onClick={() => setStep(step + 1)}>
        {step >= STEPLIST.length + 1 ? '저장' : '다음'}
      </S.Button>
    </S.Container>
  );
};

export default Step;
