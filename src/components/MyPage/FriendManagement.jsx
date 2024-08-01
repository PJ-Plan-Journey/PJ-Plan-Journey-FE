// src/components/MyPage/FriendManagement.jsx
import React from 'react';
import {
  FriendContainer,
  LoginText,
  FriendRequestContainer,
  FriendRequestActions,
  FriendContainerInner,
  FriendActions,
} from '@styles/mypage/FriendManagement.styles';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { MdGroupAdd } from 'react-icons/md';
import useFriendStore from '../../zustands/friend/useFriendStore';

const FriendManagement = () => {
  // 상태와 액션을 가져옵니다.
  const {
    friends,
    friendRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    inviteToEvent,
  } = useFriendStore();

  return (
    <FriendContainer>
      <LoginText>친구요청</LoginText>
      {friendRequests.length > 0 ? (
        friendRequests.map((user) => (
          <FriendRequestContainer key={user.id}>
            <div>
              <strong>{user.name}님</strong> {user.email}
            </div>
            <FriendRequestActions>
              <FaCheck
                style={{ cursor: 'pointer' }}
                onClick={() => acceptFriendRequest(user.id)}
              />
              <FaTrash
                style={{ cursor: 'pointer' }}
                onClick={() => rejectFriendRequest(user.id)}
              />
            </FriendRequestActions>
          </FriendRequestContainer>
        ))
      ) : (
        <p>친구 요청이 없습니다.</p>
      )}
      <LoginText>친구</LoginText>
      {friends.length > 0 ? (
        friends.map((user) => (
          <FriendContainerInner key={user.id}>
            <div>
              <strong>{user.name}님</strong> {user.email}
            </div>
            <FriendActions>
              <MdGroupAdd
                style={{ cursor: 'pointer' }}
                onClick={() => inviteToEvent(user.id)}
              />
              <FaTrash
                style={{ cursor: 'pointer' }}
                onClick={() => removeFriend(user.id)}
              />
            </FriendActions>
          </FriendContainerInner>
        ))
      ) : (
        <p>친구가 없습니다.</p>
      )}
    </FriendContainer>
  );
};

export default FriendManagement;
