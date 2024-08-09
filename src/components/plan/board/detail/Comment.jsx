import { useState } from 'react';
import * as S from '@styles/plan/board/detail/Comment.style';

const Comment = ({ comment }) => {
  const { commentId, content, nickname, createdAt, childComment } = comment;

  const [isVisible, setIsVisible] = useState(false);

  const togglechildCommentList = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <S.CommentContainer>
      <div className="main">
        <div>
          <span className="username">{nickname}</span>
          {content}
        </div>
      </div>
      <div className="sub">
        <div>{createdAt}</div>
        <button>댓글 달기</button>
      </div>

      {childComment.length > 0 && (
        <button onClick={togglechildCommentList}>답글 보기</button>
      )}

      {isVisible && (
        <div>
          {childComment.map((child) => (
            <div key={child.childCommentId}>
              <div>
                {child.nickname} {child.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </S.CommentContainer>
  );
};

export default Comment;
