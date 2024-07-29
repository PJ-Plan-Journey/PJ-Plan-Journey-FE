import styled from 'styled-components';
import { FaMapMarkerAlt, FaShareSquare } from 'react-icons/fa';
import { TbMapPlus } from 'react-icons/tb';

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 가로로 정렬 */
  gap: 1.5rem; /* 메뉴 간격 */
  align-items: flex-start; /* 왼쪽 정렬 */
  margin-top: 4rem;
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center; /* 중앙 정렬 */
  width: 3cm;
  height: 4cm;
  cursor: pointer; /* 클릭 가능한 커서로 변경 */
`;

const MenuIcon = styled.div`
  font-size: 2rem; /* 아이콘 크기 */
  margin-bottom: 0.5rem; /* 아이콘과 텍스트 사이의 간격 */
`;

const MenuText = styled.div`
  font-size: 1rem; /* 메뉴 이름 폰트 사이즈 */
  text-align: center; /* 텍스트 중앙 정렬 */
`;

const Menu = ({ scrollToRef, journeyRef, planRef, shareRef }) => (
  <MenuWrapper>
    <MenuItem onClick={() => scrollToRef(journeyRef)}>
      <MenuIcon>
        <FaMapMarkerAlt />
      </MenuIcon>
      <MenuText>여행지 추천</MenuText>
    </MenuItem>
    <MenuItem onClick={() => scrollToRef(planRef)}>
      <MenuIcon>
        <TbMapPlus />
      </MenuIcon>
      <MenuText>계획하기</MenuText>
    </MenuItem>
    <MenuItem onClick={() => scrollToRef(shareRef)}>
      <MenuIcon>
        <FaShareSquare />
      </MenuIcon>
      <MenuText>일정공유</MenuText>
    </MenuItem>
  </MenuWrapper>
);

export default Menu;
