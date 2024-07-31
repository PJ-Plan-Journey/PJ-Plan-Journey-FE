import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import PlaceListItem from '@components/plan/place/SelectedIPlace';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import * as S from '@styles/plan/place/SelectedList.style';
import { FaMapLocationDot as MapIcon } from 'react-icons/fa6';

const SelectedList = ({ isVisible, onToggle }) => {
  const { placeList, movePlace, initList } = usePlaceStore();

  const onDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = placeList.findIndex((item) => item.id === active.id);
      const newIndex = placeList.findIndex((item) => item.id === over.id);

      movePlace(oldIndex, newIndex);
    }
  };

  return (
    <S.SideBar className={isVisible ? 'show' : 'hide'}>
      <S.SelectedListContainer>
        <div className="sub-box">
          <h1 className="select-number">선택 : {placeList.length}</h1>
          <button className="init-button" onClick={initList}>
            초기화
          </button>
        </div>
        {placeList.length > 0 ? (
          <ul className="list">
            <DndContext
              onDragEnd={onDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext items={placeList.map((item) => item.id)}>
                {placeList.map((item, index) => (
                  <PlaceListItem key={item.id} place={item} index={index + 1} />
                ))}
              </SortableContext>
            </DndContext>
          </ul>
        ) : (
          <div className="not-content">여행갈 장소를 추가해주세요.</div>
        )}
      </S.SelectedListContainer>

      <S.OpenSeletedBoxButton onClick={onToggle}>
        <MapIcon />
        {placeList.length > 0 && (
          <div className="select-number">{placeList.length}</div>
        )}
      </S.OpenSeletedBoxButton>
    </S.SideBar>
  );
};

export default SelectedList;
