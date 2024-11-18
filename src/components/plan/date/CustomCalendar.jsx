import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import useCalendar from '@hooks/plan/date/useCalendar';
import * as S from '@styles/plan/date/CustomCalendar.style';
import Button from '@components/common/Button';
import useCalendarControl from '@hooks/plan/date/useCalendarControl';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const CustomCalendar = ({ dates, setDates }) => {
  const { months, renderCalendar } = useCalendar(dates, setDates);
  const {
    year,
    setYear,
    setMonth,
    month,
    monthRefs,
    yearOptions,
    scrollToDate,
    scrollToTop,
    scrollToBottom,
  } = useCalendarControl(months);

  return (
    <S.Wrapper>
      <S.CalendarContainer>
        {months.map((month, index) => (
          <S.Calendar
            key={index}
            className={format(month, 'yyyy-MM')}
            ref={(el) => (monthRefs.current[index] = el)}
          >
            <div className="header">
              {format(month, 'yyyy년 MM월', { locale: ko })}
            </div>
            <table>
              <thead>
                <tr>
                  <th className="week">일</th>
                  <th className="week">월</th>
                  <th className="week">화</th>
                  <th className="week">수</th>
                  <th className="week">목</th>
                  <th className="week">금</th>
                  <th className="week">토</th>
                </tr>
              </thead>
              <tbody>{renderCalendar(month)}</tbody>
            </table>
          </S.Calendar>
        ))}
      </S.CalendarContainer>

      <S.Control>
        <div className="content">
          <div className="title">날짜 찾기</div>

          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>

          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={String(m).padStart(2, '0')}>
                {String(m).padStart(2, '0')}월
              </option>
            ))}
          </select>

          <Button variant="outline" onClick={scrollToDate}>
            이동
          </Button>

          <div className="info">
            <p>원하는 날짜를 선택하여 빠르게 이동할 수 있습니다.</p>
            <p>현재부터 2년 후까지의 날짜가 표시됩니다.</p>
          </div>
        </div>

        <div className="control-button">
          <Button type="icon" variant="outline" onClick={scrollToTop}>
            <FaAngleUp />
          </Button>
          <Button type="icon" variant="outline" onClick={scrollToBottom}>
            <FaAngleDown />
          </Button>
        </div>
      </S.Control>
    </S.Wrapper>
  );
};

export default CustomCalendar;
