import usePlaceStore from '@zustands/plan/usePlaceStore';
import useAuthStore from '@zustands/authStore';
import * as S from '@styles/plan/board/detail/DayList.style';
import LikeButton from '@components/plan/board/detail/buttonGruop/LikeButton';
import AddMyPlanButton from '@components/plan/board/detail/buttonGruop/AddMyPlanButton';
import DeleteButton from '@components/plan/board/detail/buttonGruop/DeleteButton';
import { useNavigate } from 'react-router-dom';
import { Logo } from '@styles/plan/Step.style';
import ShareButton from '@components/MyPage/ShareButton';
import { FaHeart } from 'react-icons/fa';

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

const DayList = ({ toggleComment, data }) => {
  const { setDay } = usePlaceStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  console.log(data);

  const { isPublished, planDetails, id, author, likeCount } = data || '';

  console.log(author, user.nickname);

  const groupedDaylist = groupByDate(planDetails);

  return (
    <S.DayListContainer>
      <ul className="day-list">
        <Logo onClick={() => navigate('/')} />
        <div className="day" onClick={() => setDay('')}>
          전체
        </div>

        {groupedDaylist?.map((day, index) => (
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
        <div className="like">
          <FaHeart /> <div>{likeCount}</div>
        </div>
        <LikeButton planId={id} />
        <button onClick={toggleComment}>댓글</button>

        {author === user.nickname ? (
          <>
            <ShareButton planId={id} />

            <button onClick={() => navigate(`/board/${id}/edit`)}>편집</button>

            <DeleteButton planId={id} />
          </>
        ) : (
          <AddMyPlanButton planId={id} />
        )}
      </div>
    </S.DayListContainer>
  );
};

export default DayList;
