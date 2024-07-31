import React from 'react';
import { ModalBackground, ModalContent, Input, Button } from '@styles/auth/MyPage.styles';

const Modal = ({ currentPasswordForDeletion, setCurrentPasswordForDeletion, handleDeleteAccount, setShowModal }) => {
  return (
    <ModalBackground>
      <ModalContent>
        <p>정말 회원탈퇴 하시겠습니까?</p>
        <Input
          type="password"
          placeholder="현재 비밀번호"
          value={currentPasswordForDeletion}
          onChange={(e) => setCurrentPasswordForDeletion(e.target.value)}
        />
        <Button onClick={handleDeleteAccount}>탈퇴하기</Button>
        <Button onClick={() => setShowModal(false)}>취소</Button>
      </ModalContent>
    </ModalBackground>
  );
};

export default Modal;
