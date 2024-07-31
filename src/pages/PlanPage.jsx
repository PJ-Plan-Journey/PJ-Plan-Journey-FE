import SelectedDate from '@components/plan/date/SelectedDate';
import KakaoMap from '@components/plan/KakaoMap';
import SelectPlace from '@components/plan/place/SelectPlace';
import Step from '@components/plan/Step';
import useStepStore from '@/zustands/plan/useStepStore';
import * as S from '@styles/plan/PlanPage.style';
import { useEffect } from 'react';

const PlanPage = () => {
  const { step } = useStepStore();

  // 브라우저 새로고침을 눌렀을 때 알림 표시
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

  return (
    <S.PlanPageContainer>
      <Step />
      {step == 1 && <SelectedDate />}
      {step == 2 && <SelectPlace />}
      <KakaoMap />
    </S.PlanPageContainer>
  );
};

export default PlanPage;
