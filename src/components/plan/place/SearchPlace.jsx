import { IoSearch as SearchIcon } from '@react-icons/all-files/io5/IoSearch';
import { IoIosCloseCircle as CloseIcon } from '@react-icons/all-files/io/IoIosCloseCircle';
import * as S from '@styles/plan/place/SelectPlace.style';
import useSearchPlace from '@hooks/plan/place/useSearchPlace';

const SearchPlace = ({ day, placeList, dayPlaceList, setDayPlaceList }) => {
  const {
    inputValue,
    setInputValue,
    searchList,
    initSearchValue,
    togglePlace,
  } = useSearchPlace(day, placeList, dayPlaceList, setDayPlaceList);

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

export default SearchPlace;
