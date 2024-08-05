import api from '@axios/api';
import { flex, flexColumn } from '@styles/common/common.style';
import useStepStore from '@zustands/plan/useStepStore';
import { useState } from 'react';
import styled from 'styled-components';
import { MdInfo as InfoIcon } from 'react-icons/md';

const TItleFormContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.4);

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 6;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 30px;
    background-color: white;
    border-radius: 20px;
    ${flexColumn}
    gap: 20px;
  }

  .button-group {
    width: 100%;
    ${flex}
    justify-content: center;
    gap: 10px;

    button {
      cursor: pointer;
      width: 100%;
      border: none;
      background-color: #156bf0;
      color: white;
      ${flex};
      justify-content: center;
      padding: 10px 0;
      border-radius: 10px;
      font-size: 18px;

      &.cancel {
        background-color: #b7b7b7;
        color: white;
      }
    }
  }

  .info {
    ${flex}
    gap: 5px;
    color: #b0b0b0;
    font-size: 12px;
    margin-bottom: 30px;
  }

  h1 {
    font-size: 20px;
    margin-top: 30px;
  }

  input {
    width: 90%;
    ${flex}
    justify-content: space-between;
    border: none;
    box-shadow: 0 0 2px 1px #c4c4c4;
    padding: 10px 15px;
    border-radius: 50px;
  }
`;

const TItleForm = () => {
  const { setTitle, title, setStep } = useStepStore();
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

  const asyncSubmit = async () => {
    setTitle(inputValue);

    try {
      const plan = {
        title,
        city: '서울',
        planDetails: [
          {
            sequence: 1,
            date: '2024-05-25',
            placeName: '대구이월드',
            latitude: 36.81,
            longitude: 126.3,
          },
        ],
      };

      console.log({ plan });

      const { data } = await api.post('/plans', plan);
      console.log(data);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <TItleFormContainer>
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
          <span> 해당 제목은 공유를 했을 경우 게시물의 제목이 됩니다</span>
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
    </TItleFormContainer>
  );
};

export default TItleForm;
