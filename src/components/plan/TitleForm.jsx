import api from '@axios/api';
import useStepStore from '@zustands/plan/useStepStore';
import { useState } from 'react';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { convertToPlanDetails } from '@/utils/formatRequestForm';
import * as S from '@styles/plan/TitleForm.style';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useDateStore from '@zustands/plan/useDateStore';
import { formatDate } from '@/utils/formatDate';
import useModal from '@hooks/useModal';

const TitleForm = () => {
  const { setStep } = useStepStore();
  const { startDate, endDate } = useDateStore();
  const { placeList } = usePlaceStore();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const { Modal, Title, Content } = useModal();

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  const formatDateToKorean = (date) => {
    return formatDate('yyyy-MM-dd', date);
  };

  const addPlaceSchedule = async () => {
    try {
      const plan = {
        title: inputValue,
        city: '서울',
        startDate: formatDateToKorean(startDate),
        endDate: formatDateToKorean(endDate),
        planDetails: convertToPlanDetails(placeList),
      };

      const { data } = await api.post('/plans', plan);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ['addPlan'],
    mutationFn: addPlaceSchedule,
    onSuccess: ({ data }) => {
      navigate(`/board/${data.planId}`);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  if (isPending) {
    return <div>일정 저장 중...</div>;
  }

  return (
    <Modal closeModal={() => setStep(2)} onConfirm={() => mutate()}>
      <Title>일정 제목을 설정해 주세요.</Title>
      <Content>
        <S.TItleFormStyle>
          <input
            value={inputValue}
            onChange={onChange}
            placeholder="일정의 제목을 입력해 주세요."
            autoFocus
          />

          <p className="info">
            이 제목은 일정 공유 시 게시물 제목으로 사용됩니다.
          </p>
        </S.TItleFormStyle>
      </Content>
    </Modal>
  );
};

export default TitleForm;
