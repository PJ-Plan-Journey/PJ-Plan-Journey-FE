import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 주어진 날짜를 지정된 형식으로 포맷합니다.
 * @param {string} dateFormat - 날짜 형식 문자열 (예: 'yyyy-MM-dd')
 * @param {Date} date - 포맷할 날짜
 * @returns {string | null} 포맷된 날짜 문자열 또는 null
 */
export const formatDate = (dateFormat, date) => {
  return date ? format(date, dateFormat, { locale: ko }) : null;
};
