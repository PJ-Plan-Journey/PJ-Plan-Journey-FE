import usePlaceStore from '@zustands/plan/usePlaceStore';
import * as S from '@styles/plan/board/detail/DayList.style';
import useAuthStore from '@zustands/authStore';

const daylist = [
  {
    planDetailId: 1,
    placeName: '서울역',
    latitude: 36.789,
    longitude: 127.643,
    sequence: 1,
    date: '2024-07-24',
  },
  {
    planDetailId: 2,
    placeName: '서울 강남',
    latitude: 36.789,
    longitude: 127.643,
    sequence: 2,
    date: '2024-07-25',
  },
];

const DayList = ({ toggleComment, changeEditMode, isEditMode, savePlan }) => {
  const { setDay } = usePlaceStore();
  const { user } = useAuthStore();

  console.log({ user });

  return (
    <S.DayListContainer>
      <ul className="day-list">
        <div className="day" onClick={() => setDay('')}>
          전체
        </div>

        {!isEditMode &&
          daylist.map((day, index) => (
            <div
              key={day.planDetailId}
              className="day"
              onClick={() => setDay(day.date)}
            >
              {index + 1}일차
            </div>
          ))}
      </ul>

      <div className="button-group">
        <button onClick={toggleComment}>댓글</button>
        <button>내 일정 추가</button>

        {isEditMode ? (
          <button onClick={savePlan}>편집완료</button>
        ) : (
          <button onClick={changeEditMode}>편집</button>
        )}

        <button>삭제</button>
      </div>
    </S.DayListContainer>
  );
};

export default DayList;
