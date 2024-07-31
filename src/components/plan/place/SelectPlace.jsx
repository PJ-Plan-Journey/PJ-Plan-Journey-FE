import { useEffect, useState } from 'react';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { FaPlus as AddIcon, FaCheck as CheckIcon } from 'react-icons/fa';
import { IoSearch as SearchIcon } from 'react-icons/io5';
import { IoIosCloseCircle as CloseIcon } from 'react-icons/io';
import DateRangeDisplay from '@components/plan/date/DateRangeDisplay';
import * as S from '@styles/plan/place/SelectPlace.style';
import SelectedList from '@components/plan/place/SelectedList';

const SelectPlace = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { placeList, addPlace, removePlace } = usePlaceStore();

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

  const onToggle = () => {
    setIsVisible((prev) => !prev);
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
    <S.SelectPlaceContainer>
      <div className="search-box">
        <DateRangeDisplay />
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
          {searchList.map((item) => (
            <S.SearchItem key={item.id}>
              <div className="item">
                <h1 className="place-name">{item.place_name}</h1>
                <div className="place-address">{item.address_name}</div>
              </div>

              {placeList.find((place) => place.name === item.place_name) ? (
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
      </div>
      <SelectedList isVisible={isVisible} onToggle={onToggle} />
    </S.SelectPlaceContainer>
  );
};

export default SelectPlace;
