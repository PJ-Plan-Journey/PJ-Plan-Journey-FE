import api from '@axios/api';
import BoardItem from '@components/plan/board/BoardItem';
import * as S from '@styles/plan/board/BoradList.style';
import { useQuery } from '@tanstack/react-query';

const BoradList = () => {
  const getPlanlist = async () => {
    try {
      const { data } = await api.get('plans');

      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getPlans'],
    queryFn: getPlanlist,
  });

  console.log(data);

  if (isLoading) {
    return <div>데이터 로딩 중...</div>;
  }

  return (
    <S.BoradListContainer>
      <ul className="board-list">
        {data.data?.map((item) => (
          <BoardItem key={item.planId} item={item} />
        ))}
      </ul>
    </S.BoradListContainer>
  );
};

export default BoradList;
