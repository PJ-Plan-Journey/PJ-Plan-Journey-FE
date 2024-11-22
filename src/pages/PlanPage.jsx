import useStepStore from '@/zustands/plan/useStepStore';
import * as S from '@styles/plan/PlanPage.style';
import { useEffect } from 'react';
import TitleForm from '@components/plan/TitleForm';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import Step from '@components/plan/Step';
import DateContainer from '@components/plan/DateContainer';
import useDate from '@hooks/plan/date/useDate';
import PlaceContainer from '@components/plan/PlaceContainer';

const PlanPage = () => {
  const { step, setStep } = useStepStore();
  const { dates, setDates } = useDate();
  const { initList, setDay } = usePlaceStore();

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  useEffect(() => {
    return () => {
      initList();
      setStep(1);
      setDay('');
    };
  }, [initList, setStep]);

  return (
    <S.PlanPageContainer>
      <Step dates={dates} />
      {step == 1 && <DateContainer dates={dates} setDates={setDates} />}
      {step >= 2 && <PlaceContainer dates={dates} />}

      {step >= 3 && <TitleForm />}
    </S.PlanPageContainer>
  );
};

export default PlanPage;
