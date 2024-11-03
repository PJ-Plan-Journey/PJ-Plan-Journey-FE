import * as S from '@styles/plan/board/detail/Comment.style';
import api from '@axios/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Reply from '@components/plan/board/detail/Reply';
import useAuthStore from '@zustands/useAuthStore';
import { MdMoreHoriz } from 'react-icons/md';

const Comment = ({ planId, comment, setReplyToCommentId }) => {
  const { id: commentId, content, nickname, createdAt } = comment || '';
  const queryClient = useQueryClient();
  const [editContent, setEditContent] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const { user } = useAuthStore();
  const infoBoxRef = useRef(null);
  const infoRef = useRef(null);

  const onChange = (e) => {
    setEditContent(e.target.value);
  };

  const toggle = () => {
    setShowInfo((prev) => !prev);
  };

  const editMode = () => {
    setIsEdit(true);
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

  const { mutate: deleteCommentMutate } = useMutation({
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        infoBoxRef.current &&
        !infoBoxRef.current.contains(event.target) &&
        infoRef.current &&
        !infoRef.current.contains(event.target)
      ) {
        setShowInfo(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setEditContent(content);
  }, []);

  return (
    <S.CommentContainer>
      <div className="main">
        <div>
          <div className="username">
            <div>{nickname}</div>
          </div>
          {isEdit ? (
            <>
              <input value={editContent} onChange={onChange} />
              <button
                className="button"
                onClick={() => editCommentContentMutate({ planId, commentId })}
              >
                수정
              </button>
              <button className="button" onClick={() => setIsEdit(false)}>
                취소
              </button>
            </>
          ) : (
            <div>{content}</div>
          )}
        </div>
      </div>
      <div className="sub">
        <div>{createdAt}</div>

        <div onClick={() => setReplyToCommentId({ id: commentId, nickname })}>
          댓글달기
        </div>

        {nickname === user.nickname && (
          <div className="info">
            <div ref={infoRef}>
              <MdMoreHoriz onClick={toggle} />
            </div>

            {showInfo && (
              <div className="info-box" ref={infoBoxRef}>
                <div onClick={editMode}>수정하기</div>
                <div onClick={() => deleteCommentMutate({ planId, commentId })}>
                  삭제하기
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Reply commentId={commentId} />
    </S.CommentContainer>
  );
};

export default Comment;
