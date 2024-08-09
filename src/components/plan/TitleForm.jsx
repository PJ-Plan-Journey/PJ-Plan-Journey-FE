import api from '@axios/api';
import useStepStore from '@zustands/plan/useStepStore';
import { useState } from 'react';
import { MdInfo as InfoIcon } from 'react-icons/md';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { convertToPlanDetails } from '@/utils/formatRequestForm';
import * as S from '@styles/plan/TitleForm.style';

const TItleForm = () => {
  const { setTitle, title, setStep } = useStepStore();
  const { placeList } = usePlaceStore();
  const [inputValue, setInputValue] = useState('');

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  //   {
  //     “title”: ,
  //      “city”: ,
  //      “planDetails” :
  //        [{
  //               “sequence”: ,
  //               “date”: ,
  //               “placeName”:,
  //               “latitude”:,
  //               “longitude”:,
  //         }]
  // }

  // tanstack-qeury로 변경하기
  const asyncSubmit = async () => {
    setTitle(inputValue);
    const planDetails = convertToPlanDetails(placeList);

    try {
      // api 명세서 컬럼값으로 변경하기
      const plan = {
        title: inputValue,
        city: '서울',
        planDetails,
      };

      const { data } = await api.post('/plans', plan, {
        headers: {
          USERID: 1,
        },
      });

      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };

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
          <button className="complete" onClick={asyncSubmit}>
            완료
          </button>
        </div>
      </div>
    </S.TItleFormContainer>
  );
};

export default TItleForm;
