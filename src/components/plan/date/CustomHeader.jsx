import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { IoIosArrowDroprightCircle as RightArrowIcon } from '@react-icons/all-files/io/IoIosArrowDroprightCircle';
import { IoIosArrowDropleftCircle as LeftArrowIcon } from '@react-icons/all-files/io/IoIosArrowDropleftCircle';
import * as S from '@styles/plan/date/CustomHeader.style';

const CustomHeader = ({
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  monthDate,
}) => {
  return (
    <S.CustomHeaderContainer>
      <button
        type="button"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <LeftArrowIcon />
      </button>
      <span>{format(monthDate, 'yyyy년 MMMM', { locale: ko })}</span>
      <button
        type="button"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <RightArrowIcon />
      </button>
    </S.CustomHeaderContainer>
  );
};

export default CustomHeader;
