import { useEffect, useState } from 'react';
import useKakaoLoader from '@hooks/plan/useKakaoLoader';
import usePlaceStore from '@/zustands/plan/usePlaceStore';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { flex } from '@styles/common/common.style';

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const MapStyle = styled(Map)`
  width: 100%;
  height: 100%;
`;

const CustomMarker = styled.div`
  --marker-size: 50px;
  ${flex}
  justify-content: center;
  width: var(--marker-size);
  height: var(--marker-size);
  border: 5px solid white;
  border-radius: 50%;
  background: #156bf0;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 4px 1px gray;
`;

const KakaoMap = () => {
  const { placeList } = usePlaceStore();
  const [map, setMap] = useState(null);

  useKakaoLoader();

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
    <Container>
      <MapStyle
        center={{ lat: 37.5665, lng: 126.978 }} // map 시작 좌표
        level={5} // 초기 확대 레벨 (숫자가 낮을수록 더 확대)
        onCreate={handleMapCreate} // 맵 생성 시 호출
      >
        <Polyline
          path={placeList.map(({ lat, lng }) => ({ lat, lng }))}
          strokeWeight={8} // 선 굵기
          strokeColor="#156bf0" // 선 색깔
          strokeStyle="dashed" // 선 모양
        />
        {placeList.map(({ name, lat, lng }, index) => (
          <CustomOverlayMap key={name} position={{ lat, lng }} yAnchor={0.5}>
            <CustomMarker>{index + 1}</CustomMarker>
          </CustomOverlayMap>
        ))}
      </MapStyle>
    </Container>
  );
};

export default KakaoMap;
