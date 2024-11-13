import {
  FaRegHeart as HeartIcon,
  FaRegComment as CommentIcon,
} from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import * as S from '@styles/plan/board/BoardItem.style';

const BoardItem = ({ item }) => {
  const navigate = useNavigate();
  const {
    planId,
    nickname,
    cityname,
    title,
    createdAt,
    likeCount,
    commentCount,
  } = item;

  const onClickDetailPage = () => {
    navigate(`/board/${planId}`);
  };

  return (
    <S.BoardItemContainer onClick={onClickDetailPage}>
      <S.BoardMain>
        <div className="header">
          <p className="board-id">{planId}</p>
          <p className="title">{title}</p>
        </div>

        <div className="content">
          <div className="board-info">
            <div>
              <p>이름</p>
              <span>{nickname}</span>
            </div>

            <div>
              <p>생성</p>
              <span>{createdAt}</span>
            </div>
          </div>
          <p className="city">{cityname}</p>
        </div>

        <div className="board-stats">
          <div className="like">
            <span>
              <HeartIcon />
            </span>
            <span>{likeCount}</span>
          </div>
          <div className="comment">
            <span>
              <CommentIcon />
            </span>
            <span>{commentCount}</span>
          </div>
        </div>
      </S.BoardMain>
    </S.BoardItemContainer>
  );
};

export default BoardItem;
