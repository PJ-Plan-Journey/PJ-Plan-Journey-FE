import React from 'react';
import { DropdownMenuWrapper, DropdownItem } from '@styles/main/Header.styles';

const DropdownMenu = ({ isVisible }) => {
  return (
    <DropdownMenuWrapper isVisible={isVisible}>
      <DropdownItem href="/mypage">마이페이지</DropdownItem>
      <DropdownItem href="/logout">로그아웃</DropdownItem>
    </DropdownMenuWrapper>
  );
};

export default DropdownMenu;
