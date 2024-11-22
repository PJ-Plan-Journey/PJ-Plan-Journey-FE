import { useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useSearchPlace = (day, placeList, dayPlaceList, setDayPlaceList) => {
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

  return {
    inputValue,
    setInputValue,
    searchList,
    initSearchValue,
    togglePlace,
  };
};

export default useSearchPlace;
