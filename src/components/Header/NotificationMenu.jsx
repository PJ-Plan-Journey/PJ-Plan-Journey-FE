// src/components/main/NotificationMenu.jsx

import React from 'react';
import * as S from '@styles/main/Header.styles';
import { useNavigate } from 'react-router-dom';
import api from '@axios/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NotificationMenu = ({ $isVisible, inviteList }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const inviteAccept = async (userPlanId) => {
    try {
      const { data } = await api.post(`/invites/${userPlanId}/accept`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const inviteReject = async (userPlanId) => {
    try {
      const { data } = await api.post(`/invites/${userPlanId}/reject`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: inviteAcceptMutate } = useMutation({
    mutationKey: ['inviteAccept'],
    mutationFn: (userPlanId) => inviteAccept(userPlanId),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(['getInviteList']);
      navigate(`/board/${data.planId}/edit`);
    },
  });

  const { mutate: inviteRejectMutate } = useMutation({
    mutationKey: ['inviteReject'],
    mutationFn: (userPlanId) => inviteReject(userPlanId),
    onSuccess: () => {
      console.log('성공');
      alert('거절');
      queryClient.invalidateQueries(['getInviteList']);
    },
  });

  return (
    <S.NotificationMenuWrapper $isVisible={$isVisible}>
      {inviteList?.data.length > 0 ? (
        inviteList?.data.map((item, index) => (
          <S.NotificationItem key={index}>
            <div>{item.title}</div>
            <div className="button-group">
              <button
                className="accept"
                onClick={() => inviteAcceptMutate(item.userPlanId)}
              >
                수락
              </button>
              <button
                className="reject"
                onClick={() => inviteRejectMutate(item.userPlanId)}
              >
                거절
              </button>
            </div>
          </S.NotificationItem>
        ))
      ) : (
        <S.NoNotificationMessage>알림이 없습니다.</S.NoNotificationMessage>
      )}
    </S.NotificationMenuWrapper>
  );
};

export default NotificationMenu;
