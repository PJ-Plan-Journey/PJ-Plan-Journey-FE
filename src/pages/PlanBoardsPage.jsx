import api from '@axios/api';
import Header from '@components/Header/Header';
import BoradList from '@components/plan/board/BoradList';
import { useMutation, useQuery } from '@tanstack/react-query';
import useStompStore from '@zustands/plan/useStompStore';
import { useNavigate } from 'react-router-dom';

const PlanBoardsPage = () => {
  const navigate = useNavigate();
  const getInviteList = async () => {
    try {
      const { data } = await api.get(`/invites`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data } = useQuery({
    queryKey: ['getInviteList'],
    queryFn: getInviteList,
  });

  const inviteAcceptance = async (userPlanId) => {
    try {
      const { data } = await api.post(`/invites/${userPlanId}/accept`);
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: inviteAcceptanceMutate } = useMutation({
    mutationKey: ['inviteAcceptance'],
    mutationFn: (userPlanId) => inviteAcceptance(userPlanId),
    onSuccess: ({ data }) => {
      console.log('tjdrhd');
      navigate(`/board/${data.planId}`);
    },
    onError: () => {
      console.log('dpfj');
    },
  });

  return (
    <div>
      <Header />
      <div> 페이지네이션 번호</div>
      {data?.data.map((item, index) => {
        console.log(item);

        return (
          <div
            onClick={() => inviteAcceptanceMutate(item.userPlanId)}
            key={index}
          >
            asdasdasdasdasd
          </div>
        );
      })}
      <div>정렬버튼리스트</div>
      <BoradList />
    </div>
  );
};

export default PlanBoardsPage;
