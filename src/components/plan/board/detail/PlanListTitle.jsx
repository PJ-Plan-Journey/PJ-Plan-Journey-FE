import api from '@axios/api';
import * as S from '@styles/plan/board/detail/PlanList.style';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { MdEdit } from '@react-icons/all-files/md/MdEdit';

const PlanListTitle = ({ data }) => {
  const [title, setTitle] = useState('');
  const [isEditTitle, setIsEditTitle] = useState(false);
  const queryClient = useQueryClient();

  const ontoggleEditTitle = () => {
    setIsEditTitle((prev) => !prev);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const editTitle = async (planId) => {
    try {
      const { data } = await api.patch(`/plans/${planId}`, {
        title,
      });

      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: eidtTitleMutate } = useMutation({
    mutationKey: ['editTitle'],
    mutationFn: (planId) => editTitle(planId),
    onSuccess: ({ data }) => {
      setIsEditTitle(false);
      queryClient.invalidateQueries(['getPlanDetail', data.id]);
    },
    onError: () => {
      console.log('제목변경 실패');
    },
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data]);

  return (
    <S.PlanInfo>
      {isEditTitle ? (
        <div className="title-box">
          <input value={title} onChange={onChange} autoFocus />
          <button className="edit" onClick={() => eidtTitleMutate(data.id)}>
            수정
          </button>
          <button onClick={ontoggleEditTitle}>취소</button>
        </div>
      ) : (
        <div className="title-box">
          <p className="title">{data?.title}</p>
          <MdEdit onClick={ontoggleEditTitle} />
        </div>
      )}
      <span>{data?.nickname}</span>
      <span className="city">{data?.cityName}</span>
      <span className="date">
        {data?.startDate} ~ {data?.endDate}
      </span>
    </S.PlanInfo>
  );
};

export default PlanListTitle;
