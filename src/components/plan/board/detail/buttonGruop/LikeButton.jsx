import api from '@axios/api';
import Button from '@components/common/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const LikeButton = ({ planId }) => {
  const queryClient = useQueryClient();

  // 나중에 api 따로 분리
  const togglelike = async (planId) => {
    try {
      const { data } = await api.patch(`/plans/${planId}/likes`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: likeMutate, isPending } = useMutation({
    mutationKey: ['planLike'],
    mutationFn: (planId) => togglelike(planId),
    onSuccess: ({ data }) => {
      console.log('성공', { data });
      queryClient.invalidateQueries([['getPlanDetail', data.planId]]);
    },
    onError: () => {
      console.log('실패');
    },
  });

  return <Button variant='outline' onClick={() => likeMutate(planId)}>좋아요</Button>;
};

export default LikeButton;
