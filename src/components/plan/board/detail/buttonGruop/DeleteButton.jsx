import api from '@axios/api';
import Button from '@components/common/Button';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({ planId }) => {
  const navigate = useNavigate();

  // 나중에 api 따로 분리
  const deletePlan = async (planId) => {
    try {
      const { data } = await api.delete(`/plans/${planId}`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: deleteMutate } = useMutation({
    mutationKey: ['deletePlan', planId],
    mutationFn: (planId) => deletePlan(planId),
    onSuccess: ({ data }) => {
      console.log('성공', { data });
      navigate('/board');
    },
    onError: () => {
      console.log('실패');
    },
  });

  return <Button variant='outline' onClick={() => deleteMutate(planId)}>삭제</Button>;
};

export default DeleteButton;
