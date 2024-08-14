import { useCallback, useEffect, useState } from 'react';
import useKakaoLoader from '@hooks/plan/useKakaoLoader';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import * as S from '@styles/plan/KakaoMap.style';

const KakaoMap = () => {
  const { placeList, day } = usePlaceStore();
  const [map, setMap] = useState(null);
  const [initialCenter, setInitialCenter] = useState({
    lat: 37.5665,
    lng: 126.978,
  }); // 기본 중심 좌표

  // 카카오 맵 로드 함수
  useKakaoLoader();

  // 맵 재생성
  const handleMapCreate = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // 각 day에 대해 다른 색상 적용
  const colors = ['#156bf0', '#f01562', '#15f062', '#f0d215']; // 예시 색상 배열
  const getColor = (day) => {
    // day에 따라 색상을 결정
    const days = Object.keys(placeList);
    const dayIndex = days.indexOf(day);
    return dayIndex !== -1 ? colors[dayIndex % colors.length] : colors[0];
  };

  useEffect(() => {
    if (map) {
      const bounds = new window.kakao.maps.LatLngBounds();
      let shouldSetBounds = false;

      if (day && placeList[day]?.length > 0) {
        // 선택된 day의 장소들로 경계 설정

        placeList[day].forEach(({ x: lng, y: lat }) => {
          if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            bounds.extend(new window.kakao.maps.LatLng(lat, lng));
            shouldSetBounds = true;
          }
        });
      } else if (day && !placeList[day]) {
        map.setCenter(initialCenter);
        map.setLevel(3);
        return;
      } else {
        // 모든 장소들로 경계 설정
        Object.values(placeList)
          .flat()
          .forEach(({ x: lng, y: lat }) => {
            if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
              bounds.extend(new window.kakao.maps.LatLng(lat, lng));
              shouldSetBounds = true;
            }
          });
      }

      // 경계를 설정
      if (shouldSetBounds) {
        map.setBounds(bounds);
      }
    }
  }, [map, placeList, day, initialCenter]);

  return (
    <S.KakaoContainer>
      <Map
        className="map"
        center={initialCenter}
        level={3}
        onCreate={handleMapCreate}
      >
        {day && placeList[day]?.length > 0 ? (
          // 선택된 날짜의 장소들만 렌더링
          <div>
            <Polyline
              path={placeList[day]
                .map(({ x: lng, y: lat }) => ({ lng, lat }))
                .filter(
                  ({ lng, lat }) => lng && lat && !isNaN(lng) && !isNaN(lat)
                )}
              strokeWeight={8} // 선 굵기
              strokeOpacity={1}
              strokeColor={getColor(day)} // 선택된 날짜에 대한 색상
              strokeStyle="dashed" // 선 모양
            />
            {placeList[day].map(
              ({ id, x: lng, y: lat }, placeIndex) =>
                lng &&
                lat &&
                !isNaN(lng) &&
                !isNaN(lat) && (
                  <CustomOverlayMap
                    key={`${day}-${id}`}
                    position={{ lng, lat }}
                    yAnchor={0.5}
                  >
                    <S.CustomMarker
                      style={{ backgroundColor: getColor(day) }} // 마커 색상
                    >
                      {placeIndex + 1}
                    </S.CustomMarker>
                  </CustomOverlayMap>
                )
            )}
          </div>
        ) : (
          // 날짜가 없을 때 모든 장소들 렌더링
          Object.entries(placeList).map(([currentDay, places]) => {
            const validPath = places
              .map(({ x: lng, y: lat }) => ({ lng, lat }))
              .filter(
                ({ lng, lat }) => lng && lat && !isNaN(lng) && !isNaN(lat)
              );

            return validPath.length > 0 ? (
              <div key={currentDay}>
                <Polyline
                  path={validPath}
                  strokeWeight={8} // 선 굵기
                  strokeOpacity={1}
                  strokeColor={getColor(currentDay)}
                  strokeStyle="dashed" // 선 모양
                />
                {places.map(
                  ({ id, x: lng, y: lat }, placeIndex) =>
                    lng &&
                    lat &&
                    !isNaN(lng) &&
                    !isNaN(lat) && (
                      <CustomOverlayMap
                        key={`${currentDay}-${id}`}
                        position={{ lng, lat }}
                        yAnchor={0.5}
                      >
                        <S.CustomMarker
                          style={{ backgroundColor: getColor(currentDay) }}
                        >
                          {placeIndex + 1}
                        </S.CustomMarker>
                      </CustomOverlayMap>
                    )
                )}
              </div>
            ) : null;
          })
        )}
      </Map>
    </S.KakaoContainer>
  );
};

export default KakaoMap;
