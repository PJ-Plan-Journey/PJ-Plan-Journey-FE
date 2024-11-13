import api from '@axios/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '@zustands/useAuthStore';
import { useEffect, useState } from 'react';
import * as S from '@styles/plan/board/detail/ReplyItem.style';
import { MdMoreHoriz } from 'react-icons/md';

const parseComment = (content) => {
  // 정규 표현식을 사용하여 '@'로 시작하는 단어를 찾습니다
  const regex = /(@\w+)/;
  const match = content.match(regex);

  if (match) {
    const username = match[0]; // '@username'
    const rest = content.replace(username, '').trim(); // 나머지 내용
    return { username, rest };
  }

  // '@username' 패턴이 없는 경우
  return { username: null, rest: content };
};

const ReplyItem = ({ child }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [content, setContent] = useState('');
  const { username, rest } = parseComment(child?.content);
  const [replyUsername, setReplyUsername] = useState('');
  const [info, setInfo] = useState(false);

  const onChange = (e) => {
    setContent(e.target.value);
  };

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

  useEffect(() => {
    setReplyUsername(username);
  }, []);

  useEffect(() => {
    setContent(rest);
  }, [rest]);

  return (
    <S.ReplyItemContainer>
      <div>
        <span className="username">{child.nickname}</span>
        <div>
          <span className="tag">{replyUsername}</span>
          <span className="content">{rest}</span>
        </div>
        <div className="info">
          <div className="createdAt">{child.createdAt}</div>
          <div>
            <MdMoreHoriz />
          </div>
        </div>
      </div>
      {user && user?.nickname === child.nickname && (
        <div>
          <input value={content} onChange={onChange} />
          <button onClick={() => editReplyMutate(child.id)}>수정</button>
          <button onClick={() => removeReplyMutate(child.id)}>삭제</button>
        </div>
      )}
    </S.ReplyItemContainer>
  );
};

export default ReplyItem;
