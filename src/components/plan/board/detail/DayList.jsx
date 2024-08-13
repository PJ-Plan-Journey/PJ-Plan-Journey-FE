import usePlaceStore from '@zustands/plan/usePlaceStore';
import useAuthStore from '@zustands/authStore';
import * as S from '@styles/plan/board/detail/DayList.style';
import LikeButton from '@components/plan/board/detail/buttonGruop/LikeButton';
import AddMyPlanButton from '@components/plan/board/detail/buttonGruop/AddMyPlanButton';
import DeleteButton from '@components/plan/board/detail/buttonGruop/DeleteButton';

const groupByDate = (daylist) => {
  const grouped = {};
  daylist?.forEach((item) => {
    if (!grouped[item.date]) {
      grouped[item.date] = [];
    }
    grouped[item.date].push(item);
  });
  return Object.entries(grouped);
};

const DayList = ({
  toggleComment,
  changeEditMode,
  isEditMode,
  savePlan,
  data,
}) => {
  const { setDay } = usePlaceStore();
  const { user } = useAuthStore();

  const { isPublished, planDetails, id } = data || '';

  const groupedDaylist = groupByDate(planDetails);

  return (
    <S.DayListContainer>
      <ul className="day-list">
        <div className="day" onClick={() => setDay('')}>
          전체
        </div>

        {!isEditMode &&
          groupedDaylist?.map((day, index) => (
            <div
              key={day[0] + index}
              className="day"
              onClick={() => setDay(day[0])}
            >
              {index + 1}일차
            </div>
          ))}
      </ul>

      <div className="button-group">
        <LikeButton planId={id} />

        <button onClick={toggleComment}>댓글</button>

        <button>{isPublished ? '공유취소' : '공유하기'}</button>

        <AddMyPlanButton planId={id} />

        {isEditMode ? (
          <button onClick={savePlan}>편집완료</button>
        ) : (
          <button onClick={changeEditMode}>편집</button>
        )}

        <DeleteButton planId={id} />
      </div>
    </S.DayListContainer>
  );
};

export default DayList;
