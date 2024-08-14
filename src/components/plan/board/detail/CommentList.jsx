import Comment from '@components/plan/board/detail/Comment';
import { useState } from 'react';
import * as S from '@styles/plan/board/detail/CommentList.style';
import api from '@axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const CommentList = ({ planId }) => {
  const [content, setContent] = useState('');
  const [replyCommentId, setreplyCommentId] = useState('');
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const observerRef = useRef(null);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const getComment = async ({ page, size, planId }) => {
    try {
      const { data } = await api.get(
        `/plans/${planId}/comments?page=${page}&size=${size}`
      );
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
    fetchNextPage,
    refetch,
  } = useQuery({
    queryKey: ['getComment', planId, page],
    queryFn: () => getComment({ page, size, planId }),
    keepPreviousData: true,
  });

  console.log(commentList);

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

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    refetch();
  };

  // 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <S.CommentListContainer>
      <ul className="comment-list">
        {commentList?.data?.content?.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            planId={planId}
            setPage={setPage}
          />
        ))}
      </ul>
      <button onClick={loadMore}>더보기</button>
      <div className="comment-form">
        <input value={content} onChange={onChange} />
        <button onClick={() => submitComment(planId)}>입력</button>
      </div>
    </S.CommentListContainer>
  );
};

export default CommentList;
