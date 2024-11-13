import api from '@axios/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import * as S from '@styles/plan/board/detail/Reply.style';
import ReplyItem from '@components/plan/board/detail/ReplyItem';
import { MdAddCircleOutline } from '@react-icons/all-files/md/MdAddCircleOutline';

const Reply = ({ commentId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [size] = useState(5);

  const togglechildCommentList = () => {
    setIsVisible((prev) => !prev);
  };

  const getReply = async ({ pageParam = 0, size, commentId }) => {
    try {
      const { data } = await api.get(
        `/comments/child-comments/${commentId}?page=${pageParam}&size=${size}`
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

  const {
    data: replyList,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['reply', commentId],
    queryFn: ({ pageParam }) => getReply({ pageParam, size, commentId }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
  });

  return (
    <S.ReplyContainer>
      {replyList?.pages.map(
        (page) =>
          page.data.length > 0 && (
            <button
              key={page.data.id}
              className="reply-button"
              onClick={togglechildCommentList}
            >
              - {isVisible ? '숨기기' : '답글 보기'} -
            </button>
          )
      )}

      {isVisible && (
        <>
          <ul className="reply-list">
            {replyList?.pages.map((page) =>
              page.data.map((child) => (
                <ReplyItem key={child.id} child={child} />
              ))
            )}
          </ul>

          {hasNextPage &&
            replyList.pages.some((page) => page.data.length === size) && (
              <div className="fetch-box">
                <button
                  className="fetch-button"
                  onClick={() => fetchNextPage()}
                >
                  <MdAddCircleOutline />
                </button>
              </div>
            )}
        </>
      )}
    </S.ReplyContainer>
  );
};

export default Reply;
