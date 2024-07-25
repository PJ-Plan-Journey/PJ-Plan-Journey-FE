import React from 'react';
import { Button } from '@styles/Profile.styles';

const DeleteAccountButton = () => {
  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
    // 실제 회원탈퇴 로직 추가
  };

  return <Button onClick={handleDeleteAccount}>Delete Account</Button>;
};

export default DeleteAccountButton;

