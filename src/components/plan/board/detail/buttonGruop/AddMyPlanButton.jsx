import api from '@axios/api';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const AddMyPlanButton = ({ planId }) => {
  const navigate = useNavigate();

  const addMyPlan = async (planId) => {
    try {
      const { data } = await api.post(`/plans/${planId}`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: addMyPlanMutate, isPending } = useMutation({
    mutationKey: ['addMyPlan'],
    mutationFn: (planId) => addMyPlan(planId),
    onSuccess: ({ data }) => {
      console.log('성공', { data });
      navigate('/mypage');
    },
    onError: () => {
      console.log('실패');
    },
  });

  return (
    <button onClick={() => addMyPlanMutate(planId)}>내 일정으로 추가</button>
  );
};

export default AddMyPlanButton;
