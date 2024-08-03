import { useEffect, useState } from 'react';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { FaPlus as AddIcon, FaCheck as CheckIcon } from 'react-icons/fa';
import { IoSearch as SearchIcon } from 'react-icons/io5';
import { IoIosCloseCircle as CloseIcon } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import * as S from '@styles/plan/place/SelectPlace.style';

const SelectPlace = ({ isVisible, day, setIsVisible }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [dayPlaceList, setDayPlaceList] = useState([]);
  const { addPlace, placeList } = usePlaceStore();

  const onAddPlace = (place) => {
    const newPlace = {
      ...place,
      id: uuidv4(),
    };
    setDayPlaceList((prev) => [...prev, newPlace]);
  };

  const removePlace = (id) => {
    const update = dayPlaceList.filter((item) => item.id !== id);
    setDayPlaceList(update);
  };

  const initSearchValue = () => {
    setInputValue('');
  };

  const SubmitDayList = (day) => {
    addPlace(day, dayPlaceList);
    setDayPlaceList([]);
    setIsVisible(false);
  };

  useEffect(() => {
    if (placeList[day]) {
      setDayPlaceList([...placeList[day]]);
    } else {
      setDayPlaceList([]);
    }
  }, [day, placeList]);

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
    <S.SelectPlaceContainer $isVisible={isVisible.toString()}>
      <div className="search-box">
        <div>{day}</div>
        <S.SearchBox>
          <SearchIcon />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="장소를 입력하세요"
          />
          {inputValue.length > 0 && (
            <button>
              <CloseIcon className="close" onClick={initSearchValue} />
            </button>
          )}
        </S.SearchBox>
        {inputValue && <div className="result">장소결과</div>}

        <S.SearchList>
          {inputValue && searchList.length <= 0 && (
            <div className="not-result">검색 결과가 없습니다</div>
          )}

          {searchList?.map((item) => (
            <S.SearchItem key={item.id}>
              <div className="item">
                <h1 className="place-name">{item.place_name}</h1>
                <div className="place-address">{item.address_name}</div>
              </div>

              {dayPlaceList.find(
                (place) => place.place_name === item.place_name
              ) ? (
                <button className="check" onClick={() => removePlace(item.id)}>
                  <CheckIcon />
                </button>
              ) : (
                <button className="add" onClick={() => onAddPlace(item)}>
                  <AddIcon />
                </button>
              )}
            </S.SearchItem>
          ))}
        </S.SearchList>
        <button className="complete" onClick={() => SubmitDayList(day)}>
          선택완료
        </button>
      </div>
    </S.SelectPlaceContainer>
  );
};

export default SelectPlace;
