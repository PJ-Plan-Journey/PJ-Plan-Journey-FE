import React, { useState } from 'react';
import { LoginTextContainer, LoginText, Card, InputContainer, InputWrapper, Input, Button } from '@styles/mypage/MainContent.styles';

const AccountSettings = ({ user, onDeleteAccount }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordValid, setIsCurrentPasswordValid] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      console.log('비밀번호 변경 성공');
      // 비밀번호 변경 로직 추가
    } else {
      console.log('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleCurrentPasswordValidation = () => {
    // 실제 검증 로직을 추가해야 함
    if (currentPassword === 'userPassword') { // 실제로는 서버 검증 로직이 필요
      setIsCurrentPasswordValid(true);
    } else {
      setIsCurrentPasswordValid(false);
    }
  };

  return (
    <>
      <Card>
        <InputContainer>
          <InputWrapper>
            <Input
              type="password"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onBlur={handleCurrentPasswordValidation}
            />
          </InputWrapper>
          {isCurrentPasswordValid && (
            <>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="변경할 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </InputWrapper>
              <InputWrapper>
                <Input
                  type="password"
                  placeholder="변경할 비밀번호 확인"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </InputWrapper>
            </>
          )}
          <Button
            onClick={handlePasswordChange}
            disabled={!isCurrentPasswordValid || newPassword !== confirmPassword}
          >
            비밀번호 변경
          </Button>
        </InputContainer>
      </Card>
      <Button onClick={onDeleteAccount}>회원탈퇴</Button>
    </>
  );
};

export default AccountSettings;
