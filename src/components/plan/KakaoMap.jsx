import { useEffect, useState } from 'react';
import useKakaoLoader from '@hooks/plan/useKakaoLoader';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import * as S from '@styles/plan/KakaoMap.style';

const KakaoMap = () => {
  const { placeList } = usePlaceStore();
  const [map, setMap] = useState(null);

  // 카카오 맵 로드 함수
  useKakaoLoader();

  // 맵 생성
  const handleMapCreate = (mapInstance) => {
    setMap(mapInstance);
  };

  useEffect(() => {
    if (map && placeList.length > 0) {
      const bounds = new window.kakao.maps.LatLngBounds();
      placeList.forEach(({ lat, lng }) => {
        bounds.extend(new window.kakao.maps.LatLng(lat, lng));
      });
      map.setBounds(bounds);
    }
  }, [map, placeList]);

  return (
    <S.KakaoContainer>
      <Map
        className="map"
        center={{ lat: 37.5665, lng: 126.978 }} // map 시작 좌표 ( 나중에 변경 필수 )
        level={5} // 초기 확대 레벨 (숫자가 낮을수록 더 확대)
        onCreate={handleMapCreate} // 맵 생성 시 호출
      >
        <Polyline
          path={placeList.map(({ lat, lng }) => ({ lat, lng }))}
          strokeWeight={8} // 선 굵기
          strokeOpacity={1}
          strokeColor="#156bf0" // 선 색깔
          strokeStyle="dashed" // 선 모양
        />
        {placeList.map(({ name, lat, lng }, index) => (
          <CustomOverlayMap key={name} position={{ lat, lng }} yAnchor={0.5}>
            <S.CustomMarker>{index + 1}</S.CustomMarker>
          </CustomOverlayMap>
        ))}
      </Map>
    </S.KakaoContainer>
  );
};

export default KakaoMap;
