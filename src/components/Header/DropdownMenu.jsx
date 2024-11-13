// src/components/main/DropdownMenu.jsx

import React from 'react';
import * as S from '@styles/main/Header.styles'; // 스타일 경로

const DropdownMenu = ({ $isVisible }) => {
  // 콘솔 로그로 isVisible 값을 확인
  console.log('DropdownMenu isVisible:', $isVisible);

  return (
    <S.DropdownMenuWrapper $isVisible={$isVisible}>
      <S.DropdownItem href="/mypage">마이페이지</S.DropdownItem>
      <S.DropdownItem href="/logout">로그아웃</S.DropdownItem>
    </S.DropdownMenuWrapper>
  );
};

export default DropdownMenu;
