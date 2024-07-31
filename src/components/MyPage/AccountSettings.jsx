import React, { useState } from 'react';
import { LoginText, MenuText, Input, MenuItemRed } from '@styles/auth/MyPage.styles';
import { FaUser, FaLock } from 'react-icons/fa';

const AccountSettings = ({ user, onDeleteAccount }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <div>
      <LoginText>계정센터</LoginText>
      <MenuText>개인정보</MenuText>
      <p>이름: {user.name}</p>
      <p>계정: {user.email}</p>
      <MenuText>
        <FaLock /> 비밀번호 수정
      </MenuText>
      <Input
        type="password"
        placeholder="현재 비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="변경할 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="변경할 비밀번호 확인"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
      />
      <MenuItemRed onClick={() => onDeleteAccount(currentPassword)}>회원탈퇴</MenuItemRed>
    </div>
  );
};

export default AccountSettings;
