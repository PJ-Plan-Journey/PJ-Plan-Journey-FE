import Header from '@components/Header/Header'; // 24.08.05 경로수정 common/Header =? Header/Header

const PlanBoardsPage = () => {
  return (
    <div>
      <Header />
      <div>정렬버튼리스트</div>
      <div>
        <ul>
          <div>리스트 아이템</div>
          <div>리스트 아이템</div>
        </ul>
      </div>
    </div>
  );
};

export default PlanBoardsPage;
