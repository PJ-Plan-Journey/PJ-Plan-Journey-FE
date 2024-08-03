import { useCallback, useEffect, useState } from 'react';
import useKakaoLoader from '@hooks/plan/useKakaoLoader';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import * as S from '@styles/plan/KakaoMap.style';

const KakaoMap = () => {
  const { placeList, day } = usePlaceStore();
  const [map, setMap] = useState(null);

  // 카카오 맵 로드 함수
  useKakaoLoader();

  // 맵 재생성
  const handleMapCreate = (mapInstance) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (map && placeList[day]?.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      placeList[day].forEach(({ x: lat, y: lng }) => {
        bounds.extend(new window.kakao.maps.LatLng(lng, lat));
      });
      map.setBounds(bounds);
    }
  }, [map, placeList, day]);

  return (
    <S.KakaoContainer>
      <Map
        className="map"
        center={
          placeList[day] && placeList[day].length > 0
            ? { lat: placeList[day][0].y, lng: placeList[day][0].x }
            : { lat: 37.5665, lng: 126.978 }
        } // 기본 중심 좌표
        level={3} // 초기 확대 레벨
        onCreate={handleMapCreate} // 맵 생성 시 호출
      >
        {placeList[day] && placeList[day].length > 0 && (
          <>
            <Polyline
              path={placeList[day]?.map(({ x: lng, y: lat }) => ({ lng, lat }))}
              strokeWeight={8} // 선 굵기
              strokeOpacity={1}
              strokeColor="#156bf0" // 선 색깔
              strokeStyle="dashed" // 선 모양
            />
            {placeList[day]?.map(({ id, x: lng, y: lat }, index) => (
              <CustomOverlayMap
                key={`${day}-${id}`}
                position={{ lng, lat }}
                yAnchor={0.5}
              >
                <S.CustomMarker>{index + 1}</S.CustomMarker>
              </CustomOverlayMap>
            ))}
          </>
        )}
      </Map>
    </S.KakaoContainer>
  );
};

export default KakaoMap;
