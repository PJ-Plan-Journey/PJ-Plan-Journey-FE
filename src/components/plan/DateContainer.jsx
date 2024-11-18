import * as S from '@styles/plan/Date.style';
import CustomCalendar from './date/CustomCalendar';
import SelectDate from './date/SelectDate';

const DateContainer = ({ dates, setDates }) => {
  return (
    <S.DateContainer>
      <CustomCalendar dates={dates} setDates={setDates} />
      <SelectDate dates={dates} />
    </S.DateContainer>
  );
};

export default DateContainer;
