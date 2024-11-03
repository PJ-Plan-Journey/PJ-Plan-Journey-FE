import { useEffect, useState } from 'react';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { FaPlus as AddIcon } from '@react-icons/all-files/fa/FaPlus';
import { FaCheck as CheckIcon } from '@react-icons/all-files/fa/FaCheck';
import { IoSearch as SearchIcon } from '@react-icons/all-files/io5/IoSearch';
import { IoIosCloseCircle as CloseIcon } from '@react-icons/all-files/io/IoIosCloseCircle';
import { v4 as uuidv4 } from 'uuid';
import * as S from '@styles/plan/place/SelectPlace.style';
import Button from '@components/common/Button';

const SelectPlace = ({ isVisible, day, setIsVisible }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [dayPlaceList, setDayPlaceList] = useState([]);
  const { addPlace, placeList, setDay } = usePlaceStore();

  const onAddPlace = (place) => {
    const newPlace = {
      ...place,
      id: uuidv4(), // place id를 사용하면 같은 장소를 넣었을 때 오류가 나서 uuid로 각각 장소의 id를 다르게 설정
    };
    setDayPlaceList((prev) => [...prev, newPlace]);
  };

  const removePlace = (placeName) => {
    console.log(placeName);
    const update = dayPlaceList.filter((item) => item.place_name !== placeName);
    console.log(update);
    setDayPlaceList(update);
  };

  const initSearchValue = () => {
    setInputValue('');
  };

  const SubmitDayList = (day) => {
    if (dayPlaceList.length > 0) {
      setDay(day);
      addPlace(day, dayPlaceList);
    }

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
              <CloseIcon onClick={initSearchValue} />
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
                <button
                  className="check"
                  onClick={() => removePlace(item.place_name)}
                >
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
        <Button onClick={() => SubmitDayList(day)}>
          선택완료
        </Button>
      </div>
    </S.SelectPlaceContainer>
  );
};

export default SelectPlace;
