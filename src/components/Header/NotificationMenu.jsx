import React from 'react';
import { NotificationMenuWrapper, NotificationItem } from '@styles/main/Header.styles';

const NotificationMenu = ({ isVisible }) => {
  return (
    <NotificationMenuWrapper isVisible={isVisible}>
      <NotificationItem>{'{user}'}님이 친구요청을 하였습니다.</NotificationItem>
      <NotificationItem>{'{user}'}님이 여행 일정에 초대했습니다.</NotificationItem>
      <NotificationItem>수정된 일정이 있습니다.</NotificationItem>
    </NotificationMenuWrapper>
  );
};

export default NotificationMenu;
