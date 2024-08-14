import * as S from '@styles/plan/board/detail/DayList.style';
import { Logo } from '@styles/plan/Step.style';
import FriendButton from '@components/plan/board/detail/buttonGruop/FriendButton';
import { useNavigate } from 'react-router-dom';

const EditDayList = ({ planId }) => {
  const navigate = useNavigate();

  return (
    <S.DayListContainer>
      <ul className="day-list">
        <Logo onClick={() => navigate('/')} />
        <div className="day">전체</div>
      </ul>

      <div className="button-group">
        <FriendButton planId={planId} />
        <button>편집완료</button>
      </div>
    </S.DayListContainer>
  );
};

export default EditDayList;
