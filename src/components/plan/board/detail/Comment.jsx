import * as S from '@styles/plan/board/detail/Comment.style';
import api from '@axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Reply from './Reply';

const Comment = ({ planId, comment }) => {
  const { id: commentId, content, nickname, createdAt } = comment || '';
  const queryClient = useQueryClient();
  const [editContent, setEditContent] = useState('');
  const [replyContent, setReplyContent] = useState('');

  const onChange = (e) => {
    setEditContent(e.target.value);
  };

  const replyInputChange = (e) => {
    setReplyContent(e.target.value);
  };

  const editComment = async ({ planId, commentId }) => {
    try {
      const { data } = await api.patch(
        `/plans/${planId}/comments/${commentId}`,
        {
          content: editContent,
        }
      );

      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const deleteComment = async ({ planId, commentId }) => {
    console.log(planId, commentId);

    try {
      const { data } = await api.delete(
        `/plans/${planId}/comments/${commentId}`
      );

      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: editCommentContentMutate } = useMutation({
    mutationKey: ['editCommentContent', planId, commentId],
    mutationFn: ({ planId, commentId }) => editComment({ planId, commentId }),
    onSuccess: () => {
      console.log('성공');
      queryClient.invalidateQueries(['getComment']);
    },
    onError: () => {
      console.log('실패');
    },
  });

  const { mutate: commentMutate } = useMutation({
    mutationKey: ['deleteComment', planId, commentId],
    mutationFn: ({ planId, commentId }) => deleteComment({ planId, commentId }),
    onSuccess: () => {
      console.log('성공');
      queryClient.invalidateQueries(['getComment']);
    },
    onError: () => {
      console.log('실패');
    },
  });

  const addReplyComment = async (commentId) => {
    try {
      const { data } = await api.post(`/comments/${commentId}/child-comments`, {
        content: replyContent,
      });
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: addReplyMutate } = useMutation({
    mutationKey: ['addReply'],
    mutationFn: (commentId) => addReplyComment(commentId),
    onSuccess: () => {
      console.log('대댓글 성공');
      queryClient.invalidateQueries(['reply']); // 여기 대댓글 업데이트
    },
    onError: () => {
      console.log('대댓글 실패');
    },
  });

  return (
    <S.CommentContainer>
      <input value={editContent} onChange={onChange} />
      <button onClick={() => editCommentContentMutate({ planId, commentId })}>
        수정
      </button>
      <button onClick={() => commentMutate({ planId, commentId })}>삭제</button>

      <div className="main">
        <div>
          <span className="username">{nickname}</span>
          <div>{content}</div>
        </div>
      </div>
      <div className="sub">
        <div>{createdAt}</div>
      </div>
      <div>
        <input value={replyContent} onChange={replyInputChange} />
        <button onClick={() => addReplyMutate(commentId)}>답글 달기</button>
      </div>

      <Reply commentId={commentId} />
    </S.CommentContainer>
  );
};

export default Comment;
