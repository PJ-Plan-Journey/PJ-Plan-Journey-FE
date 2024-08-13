import React, { useState } from 'react';
import * as S from '@styles/mypage/FriendManagement.styles';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@axios/api';
import { useNavigate } from 'react-router-dom';

const FriendManagement = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [friendEmail, setFriendEmail] = useState('');

  // 친구 요청 받은 목록 가져오기
  const { data: friendRequests = [], isLoading: isRequestsLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: () =>
      api.get('/friends/receivedLists').then((res) => res.data.data),
  });

  // 친구 목록 가져오기
  const { data: friends = [], isLoading: isFriendsLoading } = useQuery({
    queryKey: ['friends'],
    queryFn: () => api.get('/friends').then((res) => res.data.data),
  }); 
  
  // 친구 요청 수락
  const acceptFriendMutation = useMutation({
    mutationFn: (id) => api.post(`/friends/accept/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['friends']);
    },
    onError: (error) => {
      console.log('친구 요청 수락 실패:', error);
      alert('친구 요청 수락에 실패했습니다.');
    },
  });

  // 친구 요청 거절
  const rejectFriendMutation = useMutation({
    mutationFn: (id) => api.post(`/friends/reject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
    },
    onError: (error) => {
      console.log('친구 요청 거절 실패:', error);
      alert('친구 요청 거절에 실패했습니다.');
    },
  });

  const removeFriend = async(id) => {
    if (!id) {
      console.error('friendId가 정의되지 않았습니다.');
      alert('친구를 삭제할 수 없습니다. 잠시 후 다시 시도하세요.');
      return;
    }
    
    try {
      const response = await api.delete(`/friends/${id}`);
      console.log('친구 삭제 요청 성공:', response);
      return response.data;
    } catch (error) {
      console.log('친구 삭제 실패:', error);
    }
  }

 // 친구 삭제
const removeFriendMutation = useMutation({
  mutationKey: ['removeFriend'],
  mutationFn: (id) => removeFriend(id),
  onSuccess: (res) => {
    console.log(res)
    queryClient.invalidateQueries(['friends']);
  },
  onError: (error) => {
    console.log('실패', {error})
  }
});



  // 친구 추가
  const addFriendMutation = useMutation({
    mutationFn: () =>
      api.post('/friends/request', { receiverEmail: friendEmail }),
    onSuccess: (response) => {
      alert('친구 요청을 성공적으로 보냈습니다.');
      setFriendEmail('');
    },
    onError: (error) => {
      console.log('친구 요청 실패:', error);
      alert('친구 요청에 실패했습니다.');
    },
  });
  console.log(friendEmail)
  const handleAddFriend = (e) => {
    e.preventDefault();
    const trimmedEmail = friendEmail.trim();
    addFriendMutation.mutate({ receiverEmail: trimmedEmail });
  };

  const uniqueFriends = Array.from(new Set(friends.map(friend => friend.friendId)))
  .map(id => {
    return friends.find(friend => friend.friendId === id);
  });


  console.log(friendRequests)
return (
  <S.FriendContainer>
    <S.AddFriendSection>
      <S.Input
        type="email"
        placeholder="친구 이메일을 입력하세요"
        value={friendEmail}
        onChange={(e) => setFriendEmail(e.target.value)}
      />
      <S.Button onClick={handleAddFriend}>친구추가</S.Button>
    </S.AddFriendSection>
    <S.LoginText>친구요청</S.LoginText>
    {isRequestsLoading ? (
      <p>Loading friend requests...</p>
    ) : friendRequests.length > 0 ? (
      friendRequests.map((user) => (
        <S.FriendRequestContainer key={user.friendRequestId}>
          <div>
            <strong>{user.senderNickname || 'No Nickname'}님</strong>
          </div>
          <S.FriendRequestActions>
            <FaCheck
              style={{ cursor: 'pointer' }}
              onClick={() =>
                acceptFriendMutation.mutate(user.friendRequestId)
              }
            />
            <FaTrash
              style={{ cursor: 'pointer' }}
              onClick={() =>
                rejectFriendMutation.mutate(user.friendRequestId)
              }
            />
          </S.FriendRequestActions>
        </S.FriendRequestContainer>
      ))
    ) : (
      <p>No friend requests available</p>
    )}
    <S.LoginText>친구</S.LoginText>
    {isFriendsLoading ? (
      <p>Loading friends...</p>
    ) : uniqueFriends.length > 0 ? (
      uniqueFriends.map((user) => (
        <S.FriendContainerInner key={user.friendId}>
          <div>
            <strong>{user.friendNickname|| 'No Nickname'}님</strong>
          </div>
          <S.FriendActions>
            <MdGroupAdd
              style={{ cursor: 'pointer' }}
              onClick={() => inviteToEvent(user.id)}
            />
            <FaTrash
              style={{ cursor: 'pointer' }}
              onClick={() => removeFriendMutation.mutate(user.friendId)}
            />
          </S.FriendActions>
        </S.FriendContainerInner>
      ))
    ) : (
      <p>No friends found</p>
    )}
  </S.FriendContainer>
);

};

export default FriendManagement;