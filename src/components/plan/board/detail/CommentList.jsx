import Comment from '@components/plan/board/detail/Comment';
import { useState } from 'react';
import * as S from '@styles/plan/board/detail/CommentList.style';

const commentList = [
  {
    commentId: 1,
    content:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias soluta laborum voluptatem nam aspernatur porro, amet accusamus quas est? Ipsa voluptatibus quo officiis at velit vero nobis, explicabo in perferendis?',
    nickname: '작성자',
    createdAt: '2024-07-08',
    childComment: [
      {
        childCommentId: 1,
        content: '대댓글입니다.',
        nickname: '작성자',
        createdAt: '2024-07-08',
      },
    ],
  },
  {
    commentId: 2,
    content: 'dasdasdsadsadsadsadsadasd',
    nickname: '작성자2',
    createdAt: '2024-07-08',
    childComment: [],
  },
  {
    commentId: 3,
    content: '댓글입니다.',
    nickname: '작성자3',
    createdAt: '2024-07-08',
    childComment: [
      {
        childCommentId: 1,
        content: '대댓글입니다.',
        nickname: '작성자2',
        createdAt: '2024-07-08',
      },
      {
        childCommentId: 2,
        content: '대댓글입니다.',
        nickname: '작성자2',
        createdAt: '2024-07-08',
      },
    ],
  },
];

const CommentList = () => {
  const [inputValue, setInputValue] = useState('');

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <S.CommentListContainer>
      <ul className="comment-list">
        {commentList.map((comment) => (
          <Comment key={comment.commentId} comment={comment} />
        ))}
      </ul>
      <form className="comment-form" onSubmit={onSubmit} method="POST">
        <input value={inputValue} onChange={onChange} />
        <button>입력</button>
      </form>
    </S.CommentListContainer>
  );
};

export default CommentList;
