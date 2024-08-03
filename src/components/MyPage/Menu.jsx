// src/components/MyPage/Menu.jsx

import React from 'react';
import * as S from '@styles/MyPage.styles'; // 스타일 경로
import { FaCogs, FaUserFriends, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';

const Menu = ({ user, setSelectedMenu }) => {
  return (
    <S.MenuContainerWrapper>
      <h1>{user.name ? `${user.name} 님` : '사용자 님'}</h1>
      <S.MenuItem onClick={() => setSelectedMenu('account')}>
        <S.MenuItemIcon>
          <FaCogs />
        </S.MenuItemIcon>
        계정센터
      </S.MenuItem>
      <S.MenuItem onClick={() => setSelectedMenu('friends')}>
        <S.MenuItemIcon>
          <FaUserFriends />
        </S.MenuItemIcon>
        친구관리
      </S.MenuItem>
      <S.MenuItem onClick={() => setSelectedMenu('travel')}>
        <S.MenuItemIcon>
          <FaCalendarAlt />
        </S.MenuItemIcon>
        나의 일정
      </S.MenuItem>
      <S.MenuItem onClick={() => alert('로그아웃 클릭')}>
        <S.MenuItemIcon>
          <FaSignOutAlt />
        </S.MenuItemIcon>
        로그아웃
      </S.MenuItem>
    </S.MenuContainerWrapper>
  );
};

export default Menu;
