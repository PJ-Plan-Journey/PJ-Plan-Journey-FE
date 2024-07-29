import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import styled from 'styled-components';
import { flex, flexColumn } from '@styles/common/common.style';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import usePlaceStore from '@zustand/plan/usePlaceStore';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { IoIosCloseCircle } from 'react-icons/io';
import DateRangeDisplay from '@components/plan/date/DateRangeDisplay';
import PlaceListItem from '@components/plan/place/PlaceListItem';

const Container = styled.div`
  ${flex}
  height: 100%;
  gap: 30px;
`;

const SearchContainer = styled.div`
  position: relative;
  ${flexColumn}
  width: 450px;
  height: inherit;
  padding: 30px;

  ul {
    width: 100%;
    height: inherit;
    ${flexColumn}
  }
`;

const SubBox = styled.div`
  width: 100%;
  color: #a2a2a2;
  padding: 20px;
  border-bottom: 1px solid #c4c4c4;
`;

const SearchBox = styled.div`
  width: 100%;
  ${flex}
  justify-content: space-between;
  border: 3px solid #c4c4c4;
  padding: 10px 15px;
  border-radius: 50px;
  margin-top: 50px;

  svg {
    font-size: 30px;
    color: #5f5f5f;
  }

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 20px;
    margin-top: 3px;
    margin-left: 5px;
    font-weight: bold;
  }

  button {
    ${flex}
    justify-content: center;
    background-color: white;
    border: none;
    padding: 0;
  }

  .close {
    cursor: pointer;
    color: #b4b4b4;

    &:hover {
      color: #156bf0;
    }
  }

  &:focus-within {
    border-color: #156bf0;
  }
`;

const SearchList = styled.ul`
  ${flexColumn}
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dedede;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const SearchItem = styled.li`
  width: 100%;
  ${flex}
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #c2c2c2;

  h1 {
    margin-bottom: 12px;
    font-weight: bold;
    font-size: 20px;
  }

  button {
    ${flex}
    justify-content: center;
    cursor: pointer;
    padding: 10px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 2px #9c9c9c;
    transition: all 0.2s ease-out;

    &.check {
      background-color: #156bf0;
      color: white;
    }

    &.add {
      background-color: #ffffff;
      color: #898989;
    }

    &:hover {
      background-color: #156bf0;
      color: white;
    }
  }

  .item {
    width: 100%;
  }

  .address {
    color: #a5a5a5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const OpenSeletedBoxButton = styled.button`
  position: absolute;
  bottom: 0;
  left: 100%;
  z-index: 3;
`;

const SelectedListContainer = styled.div`
  background-color: white;
  padding: 20px 40px;
  height: 100%;
`;

const SelectedPlaceBox = styled.ul`
  ${flexColumn}
  gap: 15px;
  min-width: 350px;
  height: inherit;
  padding: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dedede;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const SelectedPlace = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const { placeList, addPlace, movePlace, removePlace, initList } =
    usePlaceStore();

  const onDragEnd = ({ active, over }) => {
    if (over && active.id !== over.id) {
      const oldIndex = placeList.findIndex((item) => item.id === active.id);
      const newIndex = placeList.findIndex((item) => item.id === over.id);

      movePlace(oldIndex, newIndex);
    }
  };

  const onAddPlace = (place) => {
    addPlace({
      id: place.id,
      name: place.place_name,
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      address: place.address_name,
      roadAddress: place.road_address_name,
      url: place.place_url,
    });
  };

  const initSearchValue = () => {
    setInputValue('');
  };

  useEffect(() => {
    // 디바운스 적용 필요
    const ps = new window.kakao.maps.services.Places();
    if (inputValue) {
      ps.keywordSearch(inputValue, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchList([...data]);
        }
      });
    } else {
      setSearchList([]);
    }
  }, [inputValue]);

  return (
    <Container>
      <SearchContainer>
        <DateRangeDisplay />
        <SearchBox>
          <IoSearch />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="장소를 입력하세요"
          />
          {inputValue.length > 0 && (
            <button>
              <IoIosCloseCircle className="close" onClick={initSearchValue} />
            </button>
          )}
        </SearchBox>

        <SubBox>장소결과</SubBox>

        <SearchList>
          {searchList.map((item) => (
            <SearchItem key={item.id}>
              <div className="item">
                <h1 className="title">{item.place_name}</h1>
                <div className="address">{item.address_name}</div>
              </div>

              {placeList.find((place) => place.name === item.place_name) ? (
                <button className="check" onClick={() => removePlace(item.id)}>
                  <FaCheck />
                </button>
              ) : (
                <button className="add" onClick={() => onAddPlace(item)}>
                  <FaPlus />
                </button>
              )}
            </SearchItem>
          ))}
        </SearchList>
        <OpenSeletedBoxButton>선택장소</OpenSeletedBoxButton>
      </SearchContainer>
      <SelectedListContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <h1>선택 장소: {placeList.length}</h1>
          <span onClick={initList}>초기화</span>
        </div>
        <SelectedPlaceBox>
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
        </SelectedPlaceBox>
      </SelectedListContainer>
    </Container>
  );
};

export default SelectedPlace;
