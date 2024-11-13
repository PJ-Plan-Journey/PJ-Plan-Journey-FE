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
import Button from '@components/common/Button';

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
        <Button onClick={() => setDay('')}>
          전체
        </Button>

        {groupedDaylist?.map((day, index) => (
          <Button
            key={day[0] + index}
            variant='outline'
            onClick={() => setDay(day[0])}
          >
            {index + 1}일차
          </Button>
        ))}
      </ul>

      <div className="button-group">
        <div className="like">
          <FaHeart /> <div>{likeCount}</div>
        </div>
        <LikeButton planId={id} />
        <Button variant='outline' onClick={toggleComment}>댓글</Button>

        {author === user.nickname ? (
          <>
            <ShareButton planId={id} />

            <Button variant='outline' onClick={() => navigate(`/board/${id}/edit`)}>편집</Button>

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
