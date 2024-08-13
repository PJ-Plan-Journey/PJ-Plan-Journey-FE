import api from '@axios/api';
import { useMutation } from '@tanstack/react-query';

const AddMyPlanButton = ({ planId }) => {
  // 나중에 api 따로 분리
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
