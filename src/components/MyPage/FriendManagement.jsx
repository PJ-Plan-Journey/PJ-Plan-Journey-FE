import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '@styles/mypage/FriendManagement.styles';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@axios/api';
import useAuthStore from '@zustands/authStore';

const FriendManagement = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const accessToken = useAuthStore((state) => state.accessToken);

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //   }
  // }, [isLoggedIn, navigate]);

  const queryClient = useQueryClient();
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // 친구 목록 가져오기
  const { data: friends = [], isLoading: isFriendsLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: () => api.get('/friends', { headers }).then((res) => res.data),
  });

  // 친구 요청 목록 가져오기
  const { data: friendRequests = [], isLoading: isRequestsLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: () => api.get('/friends/receivedLists', { headers }).then((res) => res.data),
  });

  // 친구 요청 수락
  const acceptFriendMutation = useMutation({
    mutationFn: (id) => api.post('/friends/accept', { id }, { headers }),
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
    mutationFn: (id) => api.post('/friends/reject', { id }, { headers }),
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
    mutationFn: (id) => api.delete(`/friends/${id}`, { headers }),
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
    },
    onError: (error) => {
      console.error('친구 삭제 실패:', error);
      alert('친구 삭제에 실패했습니다.');
    },
  });

  // 일정 초대 (모의 함수)
  const inviteToEvent = async (id) => {
    const success = await mockSendInvite(id);
    if (success) {
      alert('일정에 초대되었습니다.');
    }
  };

  // 가상의 초대 요청을 처리하는 함수
  const mockSendInvite = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`User with ID ${id} invited to event.`);
        resolve(true);
      }, 1000);
    });
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <S.FriendContainer>
      <S.LoginText>친구요청</S.LoginText>
      {isRequestsLoading ? (
        <p>Loading friend requests...</p>
      ) : Array.isArray(friendRequests) && friendRequests.length > 0 ? (
        friendRequests.map((user) => (
          <S.FriendRequestContainer key={user.id}>
            <div>
              <strong>{user.name}님</strong> {user.email}
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
      ) : (
        <p>No friend requests found.</p>
      )}
      <S.LoginText>친구</S.LoginText>
      {isFriendsLoading ? (
        <p>Loading friends...</p>
      ) : Array.isArray(friends) && friends.length > 0 ? (
        friends.map((user) => (
          <S.FriendContainerInner key={user.id}>
            <div>
              <strong>{user.name}님</strong> {user.email}
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
      ) : (
        <p>No friends found.</p>
      )}
    </S.FriendContainer>
  );
};

export default FriendManagement;
