import React from 'react';
import {
  FriendContainer,
  LoginText,
  MenuText,
  FriendRequestContainer,
  FriendRequestActions,
  FriendContainerInner,
  FriendActions,
} from '@styles/mypage/FriendManagement.styles';
import { FaCheck, FaTrash } from 'react-icons/fa';

const FriendManagement = ({ user }) => (
  <FriendContainer>
    <LoginText>친구관리</LoginText>
    <MenuText>친구요청</MenuText>
    <FriendRequestContainer>
      <div>
        <strong>{user.name}님</strong> {user.email}
      </div>
      <FriendRequestActions>
        <FaCheck style={{ cursor: 'pointer' }} />
        <FaTrash style={{ cursor: 'pointer' }} />
      </FriendRequestActions>
    </FriendRequestContainer>
    <MenuText>친구</MenuText>
    <FriendContainerInner>
      <div>
        <strong>user1님</strong> user1@example.com
      </div>
      <FriendActions>
        <FaTrash style={{ cursor: 'pointer' }} />
      </FriendActions>
    </FriendContainerInner>
    <FriendContainerInner>
      <div>
        <strong>user2님</strong> user2@example.com
      </div>
      <FriendActions>
        <FaTrash style={{ cursor: 'pointer' }} />
      </FriendActions>
    </FriendContainerInner>
  </FriendContainer>
);

export default FriendManagement;
