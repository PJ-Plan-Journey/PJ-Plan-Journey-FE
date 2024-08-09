import Header from '@components/Header/Header';
import BoradList from '@components/plan/board/BoradList';

const PlanBoardsPage = () => {
  return (
    <div>
      <Header />
      <div> 페이지네이션 번호</div>
      <div>정렬버튼리스트</div>
      <BoradList />
    </div>
  );
};

export default PlanBoardsPage;
