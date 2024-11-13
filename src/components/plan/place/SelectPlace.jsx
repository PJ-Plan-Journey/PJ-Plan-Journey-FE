import { useCallback, useEffect, useState } from 'react';
import { IoSearch as SearchIcon } from '@react-icons/all-files/io5/IoSearch';
import { IoIosCloseCircle as CloseIcon } from '@react-icons/all-files/io/IoIosCloseCircle';
import { v4 as uuidv4 } from 'uuid';
import * as S from '@styles/plan/place/SelectPlace.style';

const SelectPlace = ({ day, placeList, dayPlaceList, setDayPlaceList }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState([]);

  const initSearchValue = useCallback(() => {
    setInputValue('');
  }, []);

  const togglePlace = (place) => {
    const isExist = dayPlaceList.find(
      (item) => item.place_name === place.place_name
    );

    if (isExist) {
      setDayPlaceList(
        dayPlaceList.filter((item) => item.place_name !== place.place_name)
      );
    } else {
      const newPlace = {
        ...place,
        id: uuidv4(),
      };
      setDayPlaceList((prev) => [...prev, newPlace]);
    }
  };

  useEffect(() => {
    if (placeList[day]) {
      setDayPlaceList([...placeList[day]]);
    } else {
      setDayPlaceList([]);
    }
  }, [day, placeList]);

  useEffect(() => {
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
    <div className="search-box">
      <S.SearchBox>
        <SearchIcon />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="장소를 입력하세요"
        />
        {inputValue.length > 0 && (
          <CloseIcon className="close" onClick={initSearchValue} />
        )}
      </S.SearchBox>

      <S.SearchList>
        {!inputValue && searchList.length === 0 && (
          <div className="not-result">장소를 검색해주세요.</div>
        )}

        {inputValue && searchList.length <= 0 && (
          <div className="not-result">검색 결과가 없습니다</div>
        )}

        {searchList?.map((item) => {
          const isSelected = dayPlaceList.find(
            (place) => place.place_name === item.place_name
          );
          const order = isSelected
            ? dayPlaceList.findIndex(
                (place) => place.place_name === item.place_name
              ) + 1
            : null;

          return (
            <S.SearchItem
              key={item.id}
              className={isSelected && 'add'}
              onClick={() => togglePlace(item)}
            >
              <div className="item">
                <p className="place-name">{item.place_name}</p>
                <p className="place-address">{item.address_name}</p>
              </div>

              {isSelected && <div className="check">{order}</div>}
            </S.SearchItem>
          );
        })}
      </S.SearchList>
    </div>
  );
};

export default SelectPlace;
