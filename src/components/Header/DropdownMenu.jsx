// src/components/main/DropdownMenu.jsx

import React from 'react';
import * as S from '@styles/main/Header.styles'; // 스타일 경로

const DropdownMenu = ({ isVisible }) => {
  return (
    <S.DropdownMenuWrapper isVisible={isVisible}>
      <S.DropdownItem href="/mypage">마이페이지</S.DropdownItem>
      <S.DropdownItem href="/logout">로그아웃</S.DropdownItem>
    </S.DropdownMenuWrapper>
  );
};

export default DropdownMenu;
