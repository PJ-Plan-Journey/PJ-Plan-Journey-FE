import React, { useState } from 'react';
import * as S from '@styles/mypage/MainContent.styles';
import api from '@axios/api';
import useAuthStore from '@zustands/useAuthStore';

const AccountSettings = ({ onDeleteAccount }) => {
  const user = useAuthStore((state) => state.user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = async () => {
    if (newPassword === confirmPassword) {
      try {
        console.log(currentPassword); // 디버깅을 위해 사용
        console.log(newPassword); // 디버깅을 위해 사용

        const response = await api.patch('/users/password', {
          password: currentPassword, // API에서 요구하는 필드 이름을 사용합니다.
          newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // 헤더를 올바른 위치에 설정
          },
        });

        console.log('비밀번호 변경 성공:', response.data);
        alert('비밀번호가 성공적으로 변경되었습니다.');
        // 비밀번호 변경 성공 후 필요한 추가 작업이 있으면 여기에 추가하세요.
      } catch (error) {
        console.log('비밀번호 변경 실패:', error.response?.data || error);
        alert('비밀번호 변경에 실패했습니다.');
      }
    } else {
      alert('새 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <S.Card>
        <S.InputContainer>
          <S.InputWrapper>
            <S.LoginText>비밀번호 수정</S.LoginText>
            <S.Input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </S.InputWrapper>
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
          <S.Button
            onClick={handlePasswordChange}
            disabled={newPassword !== confirmPassword || !currentPassword || !newPassword}
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
