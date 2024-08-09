import React, { useState } from 'react';
import * as S from '@styles/auth/Signup.styles';
import api from '@axios/api';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange',
  });

  const signupMutation = useMutation({
    mutationFn: (data) => api.post('/users', data),
    onSuccess: (response) => {
      console.log('Signup successful:', response.data);
      alert('회원가입이 완료되었습니다. 로그인 해주세요.');
      window.location.href = '/login';
    },
    onError: (error) => {
      console.log('Signup failed:', error.response?.data || error);
      alert('회원가입에 실패했습니다.');
    },
  });

  const onSubmit = (data) => {
    const { confirmPassword, ...signupData } = data;
    console.log('Sending data:', signupData);
    signupMutation.mutate(signupData);
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.InputContainer>
        <S.InputWrapper>
          <S.Input
            type="text"
            {...register('nickname', { required: '닉네임을 입력해주세요.' })}
            placeholder=" "
          />
          <S.InputLabel htmlFor="nickname">닉네임</S.InputLabel>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Input
            type="email"
            {...register('email', { required: '이메일을 입력해주세요.' })}
            placeholder=" "
          />
          <S.InputLabel htmlFor="email">이메일</S.InputLabel>
        </S.InputWrapper>
        <S.InputWrapper>
          <S.Input
            type="password"
            {...register('password', { 
              required: '비밀번호를 입력해주세요.', 
              minLength: { value: 8, message: '비밀번호는 8자 이상 입력해주세요.' } 
            })}
            placeholder=" "
          />
          <S.InputLabel htmlFor="password">비밀번호</S.InputLabel>
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
          />
          <S.InputLabel htmlFor="confirmPassword">비밀번호 확인</S.InputLabel>
          {errors.confirmPassword && <small style={{ color: 'red', fontSize: '0.75em' }}>{errors.confirmPassword.message}</small>}
        </S.InputWrapper>
      </S.InputContainer>
      <S.Button type="submit">회원가입</S.Button>
    </S.Form>
  );
};

export default SignupForm;
