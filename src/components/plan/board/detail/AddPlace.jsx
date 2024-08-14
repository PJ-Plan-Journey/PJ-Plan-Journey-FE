import { useEffect, useState } from 'react';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { FaPlus as AddIcon } from '@react-icons/all-files/fa/FaPlus';
import { FaCheck as CheckIcon } from '@react-icons/all-files/fa/FaCheck';
import { IoSearch as SearchIcon } from '@react-icons/all-files/io5/IoSearch';
import { IoIosCloseCircle as CloseIcon } from '@react-icons/all-files/io/IoIosCloseCircle';
import { v4 as uuidv4 } from 'uuid';
import * as S from '@styles/plan/place/SelectPlace.style';
import useStompStore from '@zustands/plan/useStompStore';

const AddPlace = ({
  isVisible,
  day,
  setIsVisible,
  isEditMode = false,
  data,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [dayPlaceList, setDayPlaceList] = useState([]);
  const { addPlace, placeList, setDay } = usePlaceStore();
  const { sendMessage } = useStompStore();

  const onAddPlace = (place) => {
    const newPlace = {
      date: day, // 날짜는 필요한 경우 여기에 동적으로 설정할 수 있습니다.
      id: uuidv4(), // 새로운 UUID를 생성하여 사용
      placeName: place.place_name, // 장소 이름을 `placeName`으로 설정
      sequence: placeList[day].length + 1, // 시퀀스는 필요한 경우 동적으로 설정
      x: parseFloat(place.x), // x 좌표를 숫자로 변환하여 설정
      y: parseFloat(place.y), // y 좌표를 숫자로 변환하여 설정
    };

    setDayPlaceList((prev) => [...prev, newPlace]);
  };

  console.log(dayPlaceList);

  const removePlace = (placeName) => {
    const update = dayPlaceList.filter((item) => item.placeName !== placeName);
    console.log(update);
    setDayPlaceList(update);
  };

  const initSearchValue = () => {
    setInputValue('');
  };

  const SubmitDayList = (day) => {
    if (isEditMode) {
      const newPlace = {
        type: 'INSERT',
        planId: 4,
        fromDate: '2024-07-30',
        placeName: '카페',
        latitude: 432.51,
        longitude: 123.12,
      };

      sendMessage(`/pub/edit/room/${data.id}`, newPlace);
    }

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

  console.log(dayPlaceList);

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
                (place) => place.placeName === item.place_name
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
        <button className="complete" onClick={() => SubmitDayList(day)}>
          선택완료
        </button>
      </div>
    </S.SelectPlaceContainer>
  );
};

export default AddPlace;
