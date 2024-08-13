import Comment from '@components/plan/board/detail/Comment';
import { useState } from 'react';
import * as S from '@styles/plan/board/detail/CommentList.style';
import api from '@axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const CommentList = ({ planId }) => {
  const [content, setContent] = useState('');
  const [replyCommentId, setreplyCommentId] = useState('');
  const queryClient = useQueryClient();

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const getComment = async () => {
    try {
      const { data } = await api.get(`/plans/${planId}/comments`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const {
    data: commentList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['getComment', planId],
    queryFn: getComment,
  });

  const addComment = async (planId) => {
    try {
      const { data } = await api.post(`/plans/${planId}/comments`, {
        content,
      });
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: commentMutate } = useMutation({
    mutationKey: ['addComment', planId],
    mutationFn: (planId) => addComment(planId),
    onSuccess: () => {
      console.log('댓글 성공');
      queryClient.invalidateQueries(['getComment']);
    },
    onError: () => {
      console.log('댓글 실패');
    },
  });

  const submitComment = (planId) => {
    commentMutate(planId);
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <S.CommentListContainer>
      <ul className="comment-list">
        {commentList?.data?.map((comment) => (
          <Comment key={comment.id} comment={comment} planId={planId} />
        ))}
      </ul>
      <div className="comment-form">
        <input value={content} onChange={onChange} />
        <button onClick={() => submitComment(planId)}>입력</button>
      </div>
    </S.CommentListContainer>
  );
};

export default CommentList;
