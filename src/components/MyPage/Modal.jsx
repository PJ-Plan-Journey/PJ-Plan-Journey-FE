// src/components/MyPage/Modal.jsx

import React from 'react';
import * as S from '@styles/mypage/Modal.styles'; // 스타일 경로

const Modal = ({
  currentPasswordForDeletion,
  setCurrentPasswordForDeletion,
  handleDeleteAccount,
  setShowModal,
}) => (
  <S.ModalBackground>
    <S.ModalContent>
      <p>정말 회원탈퇴 하시겠습니까?</p>
      <S.Input
        type="password"
        placeholder="현재 비밀번호"
        value={currentPasswordForDeletion}
        onChange={(e) => setCurrentPasswordForDeletion(e.target.value)}
      />
      <S.Button onClick={handleDeleteAccount}>탈퇴하기</S.Button>
      <S.Button onClick={() => setShowModal(false)}>취소</S.Button>
    </S.ModalContent>
  </S.ModalBackground>
);

export default Modal;
