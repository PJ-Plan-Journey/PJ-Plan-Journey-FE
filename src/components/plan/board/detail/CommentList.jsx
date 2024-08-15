import Comment from '@components/plan/board/detail/Comment';
import { useEffect, useRef, useState } from 'react';
import * as S from '@styles/plan/board/detail/CommentList.style';
import { MdAddCircleOutline } from '@react-icons/all-files/md/MdAddCircleOutline';
import api from '@axios/api';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const CommentList = ({ planId }) => {
  const [content, setContent] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState({
    id: null,
    nickname: '',
  });
  const queryClient = useQueryClient();
  const [size] = useState(5);
  const inputRef = useRef(null);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  // 댓글리스트 api
  const getComment = async ({ pageParam = 0, size, planId }) => {
    try {
      const { data } = await api.get(
        `/plans/${planId}/comments?page=${pageParam}&size=${size}`
      );
      return {
        data: data.data.content,
        nextPage: pageParam + 1,
        isLast: data.data.content.length < size,
      };
    } catch (error) {
      console.log({ error });
    }
  };

  // 댓글리스트 가져오기
  const {
    data: commentList,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getComment', planId],
    queryFn: ({ pageParam }) => getComment({ pageParam, size, planId }),
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextPage,
  });

  const addComment = async (planId) => {
    try {
      const { data } = await api.post(`/plans/${planId}/comments`, { content });
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const addReplyComment = async (commentId) => {
    try {
      const { data } = await api.post(`/comments/${commentId}/child-comments`, {
        content,
      });
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: commentMutate } = useMutation({
    mutationKey: ['addComment', planId],
    mutationFn: () => {
      if (
        replyToCommentId.nickname &&
        replyToCommentId.id &&
        content.includes(`@${replyToCommentId.nickname}`)
      ) {
        return addReplyComment(replyToCommentId.id);
      } else {
        return addComment(planId);
      }
    },
    onSuccess: () => {
      console.log('댓글 성공');
      setReplyToCommentId({ id: null, nickname: '' });
      setContent('');
      queryClient.invalidateQueries(['getComment']);
    },
    onError: () => {
      console.log('댓글 실패');
    },
  });

  const submitComment = () => {
    if (
      content.includes('@') &&
      !content.includes(`@${replyToCommentId.nickname}`)
    ) {
      setReplyToCommentId({ id: null, nickname: '' });
    }
    commentMutate(planId);
  };

  useEffect(() => {
    if (replyToCommentId.nickname) {
      setContent(`@${replyToCommentId.nickname} `);
      inputRef.current.focus();
    }
  }, [replyToCommentId]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <S.CommentListContainer>
      <div className="comment-box">
        <ul className="comment-list">
          {commentList?.pages.map((page) =>
            page.data.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                planId={planId}
                setReplyToCommentId={setReplyToCommentId}
              />
            ))
          )}
        </ul>
        {/** 다음 내용 가져오기 버튼 */}
        {hasNextPage && (
          <div className="fetch-box">
            <button className="fetch-button" onClick={() => fetchNextPage()}>
              <MdAddCircleOutline />
            </button>
          </div>
        )}
      </div>

      <div className="comment-form">
        <input ref={inputRef} value={content} onChange={onChange} />
        <button onClick={submitComment}>입력</button>
      </div>
    </S.CommentListContainer>
  );
};

export default CommentList;
