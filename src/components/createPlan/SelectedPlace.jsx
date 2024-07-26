import { useCallback, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import PlaceListItem from './PlaceListItem';
import styled from 'styled-components';
import { flexColumn } from '@styles/common.style';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import usePlaceStore from '@zustand/usePlaceStore';

const Container = styled.div`
  width: 800px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 100px 0;

  ul {
    ${flexColumn}
    gap: 10px;
  }
`;

const SelectedPlace = () => {
  const [inputValue, setInputValue] = useState('');
  const { placeList, addPlace, movePlace } = usePlaceStore();

  const handleSearch = useCallback(() => {
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(inputValue, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0];

        addPlace({
          name: place.place_name,
          lat: parseFloat(place.y),
          lng: parseFloat(place.x),
          isPanto: true,
        });

        setInputValue('');
      }
    });
  }, [inputValue, addPlace]);

  const onDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = placeList.findIndex((item) => item.name === active.id);
      const newIndex = placeList.findIndex((item) => item.name === over.id);

      movePlace(oldIndex, newIndex);
    }
  };

  return (
    <Container>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="장소를 입력하세요"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <ul>
        <DndContext onDragEnd={onDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={placeList.map((item) => item.name)}>
            {placeList.map((item) => (
              <PlaceListItem key={item.name} place={item} />
            ))}
          </SortableContext>
        </DndContext>
      </ul>
    </Container>
  );
};

export default SelectedPlace;
