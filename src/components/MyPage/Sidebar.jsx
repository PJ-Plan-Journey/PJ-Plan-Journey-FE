import React from 'react';
import { FaCogs, FaUserFriends, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { MenuContainerWrapper, MenuItem, MenuItemIcon, MenuItemRed } from '@styles/mypage/Sidebar.styles';

const Sidebar = ({ user }) => {
  const [selectedMenu, setSelectedMenu] = React.useState('');

  return (
    <MenuContainerWrapper>
      <h1>{user.name ? `${user.name} 님` : '사용자 님'}</h1>
      <MenuItem onClick={() => setSelectedMenu('account')}>
        <MenuItemIcon>
          <FaCogs />
        </MenuItemIcon>
        계정센터
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('friends')}>
        <MenuItemIcon>
          <FaUserFriends />
        </MenuItemIcon>
        친구관리
      </MenuItem>
      <MenuItem onClick={() => setSelectedMenu('travel')}>
        <MenuItemIcon>
          <FaCalendarAlt />
        </MenuItemIcon>
        나의 일정
      </MenuItem>
      <MenuItem onClick={() => alert('로그아웃 클릭')}>
        <MenuItemIcon>
          <FaSignOutAlt />
        </MenuItemIcon>
        로그아웃
      </MenuItem>
    </MenuContainerWrapper>
  );
};

export default Sidebar;
