import usePlaceStore from '@zustands/plan/usePlaceStore';
import useDateStore from '@zustands/plan/useDateStore';
import { parseISO } from 'date-fns';
import * as S from '@styles/plan/board/detail/PlanList.style';
import PlanPlaceItem from './PlanPlaceItem';
import PlanListTitle from '@components/plan/board/detail/PlanListTitle';
import { formatDate } from '@/utils/formatDate';
import useAuthStore from '@zustands/useAuthStore';

const PlanList = ({ data }) => {
  const { placeList, day: selectDay, setDay } = usePlaceStore();
  const { getDays } = useDateStore();
  const { user } = useAuthStore();
  console.log(user.nickname);

  const saveDay = (day) => {
    setDay(day);
  };

  const changeDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDate('yyyy.M.d(EE)', date);
  };

  return (
    <S.SelectedListContainer>
      <PlanListTitle data={data} />

      <S.DayList>
        {selectDay && <div>{selectDay}</div>}

        {selectDay ? (
          <ul className="list">
            {placeList[selectDay]?.map((place, index) => (
              <PlanPlaceItem
                key={place.id}
                day={selectDay}
                place={place}
                index={index + 1}
              />
            ))}
          </ul>
        ) : (
          <>
            {getDays().map((day, index) => (
              <div className="item" key={day}>
                <div className="day">
                  <span className="date" onClick={() => saveDay(day)}>
                    day{index + 1}
                  </span>

                  <div className="info">
                    <span>{changeDate(day)}</span>
                  </div>
                </div>

                <ul className="list">
                  {placeList[day]?.map((place, index) => (
                    <PlanPlaceItem
                      key={place.id}
                      day={day}
                      place={place}
                      index={index + 1}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </S.DayList>
    </S.SelectedListContainer>
  );
};

export default PlanList;
