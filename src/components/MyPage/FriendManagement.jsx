// src/components/MyPage/FriendManagement.jsx

import React, { useState } from 'react';
import * as S from '@styles/mypage/FriendManagement.styles';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@axios/api';

const FriendManagement = () => {
  const queryClient = useQueryClient();
  const [friendEmail, setFriendEmail] = useState('');

  // 친구 목록 가져오기
  const { data: friends = [], isLoading: isFriendsLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: () => api.get('/friends').then((res) => res.data.data),
  });

  // 친구 요청 받은 목록 가져오기
  const { data: friendRequests = [], isLoading: isRequestsLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: () => api.get('/friends/receivedLists').then((res) => res.data.data),
  });

  // 친구 요청 수락
  const acceptFriendMutation = useMutation({
    mutationFn: (id) => api.post('/friends/accept', { id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['friends']);
    },
    onError: (error) => {
      console.error('친구 요청 수락 실패:', error);
      alert('친구 요청 수락에 실패했습니다.');
    },
  });

  // 친구 요청 거절
  const rejectFriendMutation = useMutation({
    mutationFn: (id) => api.post('/friends/reject', { id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
    },
    onError: (error) => {
      console.error('친구 요청 거절 실패:', error);
      alert('친구 요청 거절에 실패했습니다.');
    },
  });

  // 친구 삭제
  const removeFriendMutation = useMutation({
    mutationFn: (id) => api.delete('/friends', { data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
    },
    onError: (error) => {
      console.error('친구 삭제 실패:', error);
      alert('친구 삭제에 실패했습니다.');
    },
  });

  // 친구 추가
  const addFriendMutation = useMutation({
    mutationFn: () => api.post('/friends/request', { email: friendEmail }),
    onSuccess: () => {
      alert('친구 요청을 성공적으로 보냈습니다.');
      setFriendEmail('');
    },
    onError: (error) => {
      console.error('친구 요청 실패:', error);
      alert('친구 요청에 실패했습니다.');
    },
  });

  const handleAddFriend = (e) => {
    e.preventDefault();
    addFriendMutation.mutate();
  };

  return (
    <S.FriendContainer>
      <S.LoginText>친구요청</S.LoginText>
      {isRequestsLoading ? (
        <p>Loading friend requests...</p>
      ) : (
        friendRequests.map((user) => (
          <S.FriendRequestContainer key={user.id}>
            <div>
              <strong>{user.nickname}님</strong> {user.email}
            </div>
            <S.FriendRequestActions>
              <FaCheck
                style={{ cursor: 'pointer' }}
                onClick={() => acceptFriendMutation.mutate(user.id)}
              />
              <FaTrash
                style={{ cursor: 'pointer' }}
                onClick={() => rejectFriendMutation.mutate(user.id)}
              />
            </S.FriendRequestActions>
          </S.FriendRequestContainer>
        ))
      )}
      <S.LoginText>친구</S.LoginText>
      {isFriendsLoading ? (
        <p>Loading friends...</p>
      ) : (
        friends.map((user) => (
          <S.FriendContainerInner key={user.id}>
            <div>
              <strong>{user.nickname}님</strong> {user.email}
            </div>
            <S.FriendActions>
              <MdGroupAdd
                style={{ cursor: 'pointer' }}
                onClick={() => inviteToEvent(user.id)}
              />
              <FaTrash
                style={{ cursor: 'pointer' }}
                onClick={() => removeFriendMutation.mutate(user.id)}
              />
            </S.FriendActions>
          </S.FriendContainerInner>
        ))
      )}
      <S.AddFriendSection>
        <S.Input
          type="email"
          placeholder="친구 이메일을 입력하세요"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
        />
        <S.Button onClick={handleAddFriend}>친구 추가</S.Button>
      </S.AddFriendSection>
    </S.FriendContainer>
  );
};

export default FriendManagement;
