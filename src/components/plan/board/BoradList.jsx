import BoardItem from '@components/plan/board/BoardItem';
import * as S from '@styles/plan/board/BoradList.style';

const list = [
  {
    planId: 1,
    nickname: '작성자1',
    cityname: '서울',
    title: 'title1',
    isPublished: true,
    createdAt: '2024-07-27',
    publishedAt: '2024-07-27',
    likeCount: 30,
    commentCount: 50,
  },
  {
    planId: 2,
    nickname: '작성자2',
    cityname: '서울',
    title: 'title2',
    isPublished: true,
    createdAt: '2024-07-27',
    publishedAt: '2024-07-27',
    likeCount: 1111,
    commentCount: 230,
  },
  {
    planId: 3,
    nickname: '작성자3',
    cityname: '서울',
    title: 'title3',
    isPublished: true,
    createdAt: '2024-07-27',
    publishedAt: '2024-07-27',
    likeCount: 10,
    commentCount: 30,
  },
];

const BoradList = () => {
  return (
    <S.BoradListContainer>
      <ul className="board-list">
        {list.map((item) => (
          <BoardItem key={item.planId} item={item} />
        ))}
      </ul>
    </S.BoradListContainer>
  );
};

export default BoradList;
