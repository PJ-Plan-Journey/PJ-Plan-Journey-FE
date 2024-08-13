import api from '@axios/api';
import useStepStore from '@zustands/plan/useStepStore';
import { useState } from 'react';
import { MdInfo as InfoIcon } from '@react-icons/all-files/md/MdInfo';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { convertToPlanDetails } from '@/utils/formatRequestForm';
import * as S from '@styles/plan/TitleForm.style';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useDateStore from '@zustands/plan/useDateStore';
import { formatDate } from '@/utils/formatDate';

const TItleForm = () => {
  const { setStep } = useStepStore();
  const { startDate, endDate } = useDateStore();
  const { placeList } = usePlaceStore();
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

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
      console.log({ data });
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
    <S.TItleFormContainer>
      <div className="modal">
        <h1>나의 일정 제목을 입력해주세요.</h1>

        <input
          value={inputValue}
          onChange={onChange}
          placeholder="제목을 입력하세요."
          autoFocus
        />

        <p className="info">
          <InfoIcon />
          <span> 해당 제목은 일정공유를 했을 경우 게시물의 제목이 됩니다</span>
        </p>

        <div className="button-group">
          <button className="cancel" onClick={() => setStep(2)}>
            취소
          </button>
          <button className="complete" onClick={mutate}>
            완료
          </button>
        </div>
      </div>
    </S.TItleFormContainer>
  );
};

export default TItleForm;
