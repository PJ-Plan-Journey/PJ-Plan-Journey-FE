// src/auth/SignupForm.jsx
import React, { useState } from 'react';
import * as S from '@styles/auth/Signup.styles'; // 스타일 경로
import api from '@axios/api';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange', // 유효성 검사 모드를 onChange로 설정
  });

  const signupMutation = useMutation({
    mutationFn: (data) => api.post('/auth/signup', data),
    onSuccess: (response) => {
      console.log('Signup successful:', response.data);
      window.location.href = '/login';
    },
    onError: (error) => {
      console.error('Signup failed:', error);
      alert('회원가입에 실패했습니다.');
    },
  });

  const onSubmit = (data) => {
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }
    signupMutation.mutate(data);
  };

  const handleEmailVerification = async () => {
    try {
      await api.post('/auth/send-verification-email', { email: watch('email') });
      setEmailSent(true);
      alert('인증 코드가 이메일로 전송되었습니다.');
    } catch (error) {
      console.error('Email verification failed:', error);
      alert('인증 코드 전송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async () => {
    try {
      const response = await api.post('/auth/verify-email', { email: watch('email'), verificationCode: watch('verificationCode') });
      if (response.data.success) {
        setIsEmailVerified(true);
        alert('이메일 인증이 완료되었습니다.');
      } else {
        alert('인증 코드가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('Email verification failed:', error);
      alert('이메일 인증에 실패했습니다.');
    }
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputContainer>
        {/* 이름 입력 필드 */}
        <S.InputWrapper>
          <S.Input
            type="text"
            {...register('firstName', { required: '이름을 입력해주세요.' })}
            placeholder=" "
          />
          <S.InputLabel htmlFor="firstName">이름을 입력해주세요.</S.InputLabel>
        </S.InputWrapper>

        {/* 이메일 입력 및 인증 버튼 */}
        <S.EmailContainer>
          <S.InputWrapper>
            <S.Input
              type="email"
              {...register('email', { required: '이메일을 입력해주세요.' })}
              placeholder=" "
            />
            <S.InputLabel htmlFor="email">name@example.com</S.InputLabel>
          </S.InputWrapper>
          <S.EmailButton type="button" onClick={handleEmailVerification}>
            인증
          </S.EmailButton>
        </S.EmailContainer>

        {/* 이메일 인증 코드 입력 및 확인 버튼 */}
        {emailSent && (
          <S.InputWrapper>
            <S.Input
              type="text"
              {...register('verificationCode', { required: '인증 코드를 입력해주세요.' })}
              placeholder=" "
            />
            <S.InputLabel htmlFor="verificationCode">인증 코드를 입력해주세요.</S.InputLabel>
            <S.EmailButton type="button" onClick={handleVerifyCode}>
              확인
            </S.EmailButton>
          </S.InputWrapper>
        )}

        {/* 비밀번호 및 비밀번호 확인 입력 필드 */}
        <S.InputWrapper>
          <S.Input
            type="password"
            {...register('password', { 
              required: '비밀번호를 입력해주세요.', 
              minLength: { value: 8, message: '비밀번호는 8자 이상 입력해주세요.' } 
            })}
            placeholder=" "
            className={errors.password ? 'error' : ''} // 비밀번호 오류 시 클래스 추가
          />
          <S.InputLabel htmlFor="password">암호</S.InputLabel>
          {errors.password && <small style={{ color: 'red', fontSize: '0.75em' }}>{errors.password.message}</small>}
        </S.InputWrapper>
        
        <S.InputWrapper>
          <S.Input
            type="password"
            {...register('confirmPassword', { 
              required: '비밀번호를 다시 입력해주세요.', 
              validate: (value) => value === watch('password') || '비밀번호가 일치하지 않습니다.' 
            })}
            placeholder=" "
            className={errors.confirmPassword ? 'error' : ''}
          />
          <S.InputLabel htmlFor="confirmPassword">암호 확인</S.InputLabel>
          {errors.confirmPassword && <small style={{ color: 'red', fontSize: '0.75em' }}>{errors.confirmPassword.message}</small>}
        </S.InputWrapper>
      </S.InputContainer>

      {/* 회원가입 버튼 */}
      <S.Button type="submit">회원가입</S.Button>
    </S.Form>
  );
};

export default SignupForm;
