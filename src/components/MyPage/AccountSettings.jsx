// src/components/MyPage/AccountSettings.jsx

import React, { useState } from 'react';
import * as S from '@styles/mypage/MainContent.styles';
import api from '@axios/api';
import useAuthStore from '@zustands/useAuthStore';

const AccountSettings = ({ onDeleteAccount }) => {
  const user = useAuthStore((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword && isCurrentPasswordValid) {
      try {
        const response = await api.patch('/users', {
          password: newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        console.log('비밀번호 변경 성공:', response.data);
        alert('비밀번호가 성공적으로 변경되었습니다.');
      } catch (error) {
        console.error('비밀번호 변경 실패:', error.response?.data || error);
        alert('비밀번호 변경에 실패했습니다.');
      }
    } else {
      console.log('비밀번호가 일치하지 않거나 현재 비밀번호가 유효하지 않습니다.');
    }
  };

  const handleCurrentPasswordValidation = async () => {
    // 현재 비밀번호 검증 로직
    // 여기에 실제 비밀번호 검증 로직이 필요합니다.
    // 현재는 사용자에게 현재 비밀번호가 맞다고 가정합니다.
    setIsCurrentPasswordValid(true);
  };

  return (
    <>
      <S.Card>
        <S.InputContainer>
          <S.InputWrapper>
            <S.Input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onBlur={handleCurrentPasswordValidation}
            />
          </S.InputWrapper>
          {isCurrentPasswordValid && (
            <>
              <S.InputWrapper>
                <S.Input
                  type="password"
                  placeholder="변경할 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </S.InputWrapper>
              <S.InputWrapper>
                <S.Input
                  type="password"
                  placeholder="변경할 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </S.InputWrapper>
            </>
          )}
          <S.Button
            onClick={handlePasswordChange}
            disabled={!isCurrentPasswordValid || newPassword !== confirmPassword}
          >
            비밀번호 변경
          </S.Button>
        </S.InputContainer>
      </S.Card>
      <S.Button onClick={onDeleteAccount}>회원탈퇴</S.Button>
    </>
  );
};

export default AccountSettings;
