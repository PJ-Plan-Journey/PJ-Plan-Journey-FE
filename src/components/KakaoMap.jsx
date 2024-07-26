import { useEffect, useState } from 'react';
import useKakaoLoader from '@hooks/useKakaoLoader';
import usePlaceStore from '@zustand/usePlaceStore';
import { Map, Polyline, CustomOverlayMap } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import { flex } from '@styles/common.style';

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
    console.log('지도 객체 로드됨:', mapInstance);
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
        center={{ lat: 37.5665, lng: 126.978 }}
        level={5}
        onCreate={handleMapCreate}
      >
        <Polyline
          path={placeList.map(({ lat, lng }) => ({ lat, lng }))}
          strokeWeight={8}
          strokeColor="#156bf0"
          strokeOpacity={1}
          strokeStyle="dashed"
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
