import { useState } from 'react';
import { isToday, isWithinInterval } from 'date-fns';
import { Day } from '@styles/plan/date/CustomCalendar.style';

const useCalendar = (dates, setDates) => {
  const { startDate, endDate } = dates;

  const getMonthsInTwoYears = () => {
    const months = [];
    const currentDate = new Date();
    const endDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() + 2)
    );

    for (let d = new Date(); d <= endDate; d.setMonth(d.getMonth() + 1)) {
      months.push(new Date(d));
    }

    return months;
  };

  const months = getMonthsInTwoYears();

  const isInRange = (date) => {
    if (!startDate || !endDate) return false;
    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  const handleDateClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setDates((prev) => ({
        ...prev,
        startDate: date,
        endDate: null,
      }));
    } else {
      if (date < startDate) {
        setDates((prev) => ({
          ...prev,
          startDate: date,
          endDate: startDate,
        }));
      } else {
        setDates((prev) => ({
          ...prev,
          endDate: date,
        }));
      }
    }
  };

  const renderCalendar = (month) => {
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDayOfMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();

    const calendarDays = [];
    const firstDayWeekday = firstDayOfMonth.getDay();

    for (let i = 0; i < firstDayWeekday; i++) {
      calendarDays.push(
        <td key={`empty-${month}-${i}`} className="empty"></td>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(month.getFullYear(), month.getMonth(), i);
      const isRange = isInRange(currentDate);
      const isTodayDate = isToday(currentDate);
      const isStartDate =
        startDate && currentDate.getTime() === startDate.getTime();
      const isEndDate = endDate && currentDate.getTime() === endDate.getTime();
      const isPastDate = currentDate < new Date().setHours(0, 0, 0, 0);

      const dayOfWeek = currentDate.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const dayClassNames = [
        'day',
        isRange ? 'highlight' : '',
        isWeekend ? 'weekend' : '',
        isStartDate ? 'start-date' : '',
        isEndDate ? 'end-date' : '',
        isPastDate ? 'past-date' : '',
        isTodayDate ? 'today' : '',
      ]
        .filter(Boolean)
        .join(' ');

      calendarDays.push(
        <Day
          $startDate={startDate}
          $endDate={endDate}
          key={`${month.getFullYear()}-${month.getMonth()}-${i}`}
        >
          <div
            className={dayClassNames}
            onClick={() => handleDateClick(currentDate)}
          >
            {i}
          </div>
          <div className="text">{isTodayDate && '오늘'}</div>
        </Day>
      );
    }

    const weeks = [];
    let week = [];

    for (let i = 0; i < calendarDays.length; i++) {
      week.push(calendarDays[i]);

      if (week.length === 7 || i === calendarDays.length - 1) {
        weeks.push(
          <tr
            key={`${month.getFullYear()}-${month.getMonth()}-${weeks.length}`}
          >
            {week}
          </tr>
        );
        week = [];
      }
    }

    return weeks;
  };

  return { months, renderCalendar };
};

export default useCalendar;
