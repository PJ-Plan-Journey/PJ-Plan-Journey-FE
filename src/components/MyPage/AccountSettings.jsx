import React from 'react';
import { AccountContainer, LoginText, MenuText, Input, MenuItemRed } from '@styles/mypage/AccountSettings.styles';

const AccountSettings = ({ user, onDeleteAccount }) => (
  <AccountContainer>
    <LoginText>계정센터</LoginText>
    <MenuText>개인정보</MenuText>
    <p>이름: {user.name}</p>
    <p>계정: {user.email}</p>
    <MenuText>비밀번호 수정</MenuText>
    <Input type="password" placeholder="현재 비밀번호" />
    <Input type="password" placeholder="변경할 비밀번호" />
    <Input type="password" placeholder="변경할 비밀번호 확인" />
    <MenuItemRed onClick={onDeleteAccount}>회원탈퇴</MenuItemRed>
  </AccountContainer>
);

export default AccountSettings;
