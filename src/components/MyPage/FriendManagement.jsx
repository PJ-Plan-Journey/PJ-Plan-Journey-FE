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
import { MdGroupAdd } from 'react-icons/md';

const FriendManagement = ({ user }) => (
  <FriendContainer>
    <LoginText>친구요청</LoginText>
    <FriendRequestContainer>
      <div>
        <strong>{user.name}님</strong> {user.email}
      </div>
      <FriendRequestActions>
        <FaCheck style={{ cursor: 'pointer' }} />
        <FaTrash style={{ cursor: 'pointer' }} />
      </FriendRequestActions>
    </FriendRequestContainer>
    <LoginText>친구</LoginText>
    <FriendContainerInner>
      <div>
        <strong>user1님</strong> user1@example.com
      </div>
      <FriendActions>
        <MdGroupAdd style={{ cursor: 'pointer' }} />
        <FaTrash style={{ cursor: 'pointer' }} />
      </FriendActions>
    </FriendContainerInner>
    <FriendContainerInner>
      <div>
        <strong>user2님</strong> user2@example.com
      </div>
      <FriendActions>
        <MdGroupAdd style={{ cursor: 'pointer' }} />
        <FaTrash style={{ cursor: 'pointer' }} />
      </FriendActions>
    </FriendContainerInner>
  </FriendContainer>
);

export default FriendManagement;
