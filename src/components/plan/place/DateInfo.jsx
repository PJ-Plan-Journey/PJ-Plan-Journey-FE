import { formatDate } from '@/utils/formatDate';
import useStepStore from '@zustands/plan/useStepStore';
import * as S from '@styles/plan/place/DateInfo.style';

const FORMAT = 'yyyy.MM.dd';

const DateInfo = ({ dates }) => {
  const { startDate, endDate, totalDays } = dates;
  const { setStep } = useStepStore();

  return (
    <S.Info>
      <div className="city">서울</div>

      <div className="date">
        <div>{formatDate(FORMAT, startDate)}</div>
        <div>-</div>
        <div> {formatDate(FORMAT, endDate)}</div>
        <div>({totalDays}일)</div>
        <S.EditDate onClick={() => setStep(1)} />
      </div>
    </S.Info>
  );
};

export default DateInfo;
