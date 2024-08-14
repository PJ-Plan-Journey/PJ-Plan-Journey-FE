import api from '@axios/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@zustands/useAuthStore';
import { useState } from 'react';

const Reply = ({ commentId }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState('');

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const togglechildCommentList = () => {
    setIsVisible((prev) => !prev);
  };

  const getReply = async (commentId) => {
    try {
      const { data } = await api.get(`/comments/child-comments/${commentId}`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data } = useQuery({
    queryKey: ['reply'],
    queryFn: () => getReply(commentId),
  });

  const removeReply = async (replyId) => {
    try {
      const { data } = await api.delete(`/comments/child-comments/${replyId}`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: removeReplyMutate } = useMutation({
    mutationKey: ['removeReply'],
    mutationFn: (replyId) => removeReply(replyId),
    onSuccess: () => {
      console.log('삭제');
      queryClient.invalidateQueries(['reply']);
    },
    onError: () => {
      console.log('에러발생');
    },
  });

  const editReply = async (replyId) => {
    try {
      const { data } = await api.patch(`/comments/child-comments/${replyId}`, {
        content,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate: editReplyMutate } = useMutation({
    mutationKey: ['editReply'],
    mutationFn: (replyId) => editReply(replyId),
    onSuccess: () => {
      console.log('수정');
      queryClient.invalidateQueries(['reply']);
    },
    onError: () => {
      console.log('에러발생');
    },
  });

  return (
    <div>
      {data?.data.length > 0 && (
        <button className="reply-button" onClick={togglechildCommentList}>
          - {isVisible ? '숨기기' : '답글 보기'} -
        </button>
      )}

      {isVisible && (
        <ul className="reply-list">
          {data?.data?.content.map((child) => (
            <div key={child.id}>
              <div>
                <span className="username">{child.nickname}</span>
                {child.content}
              </div>
              {user && user?.nickname === child.nickname && (
                <div>
                  <input value={content} onChange={onChange} />
                  <button onClick={() => editReplyMutate(child.id)}>
                    수정
                  </button>
                  <button onClick={() => removeReplyMutate(child.id)}>
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reply;
