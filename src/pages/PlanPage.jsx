import SelectedDate from '@components/plan/date/SelectedDate';
import KakaoMap from '@components/plan/KakaoMap';
import SelectedPlace from '@components/plan/place/SelectedPlace';
import Step from '@components/plan/Step';
import { flex } from '@styles/common/common.style';
import useStepStore from '@zustand/plan/useStepStore';
import styled from 'styled-components';

const Container = styled.div`
  ${flex}
  height: 100%;
`;

const PlanPage = () => {
  const { step } = useStepStore();

  return (
    <Container>
      <Step />
      {step == 1 && <SelectedDate />}
      {step == 2 && <SelectedPlace />}
      <KakaoMap />
    </Container>
  );
};

export default PlanPage;
