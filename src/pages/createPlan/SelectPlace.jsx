import SelectedDate from '@components/createPlan/SelectedDate';
import SelectedPlace from '@components/createPlan/SelectedPlace';
import Step from '@components/createPlan/Step';
import KakaoMap from '@components/KakaoMap';
import { flex } from '@styles/common.style';
import useStepStore from '@zustand/useStepStore';
import styled from 'styled-components';

const Container = styled.div`
  ${flex}
  height: 100%;
`;

const SelectPlace = () => {
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

export default SelectPlace;
