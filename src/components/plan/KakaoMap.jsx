import { useCallback, useEffect, useState } from 'react';
import useKakaoLoader from '@hooks/plan/place/useKakaoLoader';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import * as S from '@styles/plan/KakaoMap.style';
import useModal from '@hooks/useModal';

const KakaoMap = () => {
  const { placeList, day } = usePlaceStore();
  const [map, setMap] = useState(null);
  const { isOpen, openModal, closeModal, Modal, Title, Content } = useModal();
  const [initialCenter, setInitialCenter] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  useKakaoLoader();

  const handleMapCreate = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const colors = ['#156bf0', '#f01562', '#15f062', '#f0d215']; // 예시 색상 배열
  const getColor = (day) => {
    const days = Object.keys(placeList);
    const dayIndex = days.indexOf(day);
    return dayIndex !== -1 ? colors[dayIndex % colors.length] : colors[0];
  };

  useEffect(() => {
    if (map) {
      const bounds = new window.kakao.maps.LatLngBounds();
      let shouldSetBounds = false;

      if (day && placeList[day]?.length > 0) {
        placeList[day].forEach(({ x: lng, y: lat }) => {
          if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
            bounds.extend(new window.kakao.maps.LatLng(lat, lng));
            shouldSetBounds = true;
          }
        });
      } else if (day && !placeList[day]) {
        openModal();
        return;
      } else {
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
          <div>
            <Polyline
              path={placeList[day]
                .map(({ x: lng, y: lat }) => ({ lng, lat }))
                .filter(
                  ({ lng, lat }) => lng && lat && !isNaN(lng) && !isNaN(lat)
                )}
              strokeWeight={8}
              strokeOpacity={1}
              strokeColor={getColor(day)}
              strokeStyle="dashed"
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
                    <S.CustomMarker style={{ backgroundColor: getColor(day) }}>
                      {placeIndex + 1}
                    </S.CustomMarker>
                  </CustomOverlayMap>
                )
            )}
          </div>
        ) : (
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
                  strokeWeight={8}
                  strokeOpacity={1}
                  strokeColor={getColor(currentDay)}
                  strokeStyle="dashed"
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

      {isOpen && (
        <Modal closeModal={closeModal} type="info">
          <Title>장소를 추가해주세요</Title>
          <Content>
            해당 날짜에 아직 추가된 장소가 없습니다. 새로운 장소를 추가해보세요!
          </Content>
        </Modal>
      )}
    </S.KakaoContainer>
  );
};

export default KakaoMap;
