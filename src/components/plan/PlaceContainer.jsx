import Places from './place/Places';
import KakaoMap from './KakaoMap';

const PlaceContainer = ({ dates }) => {
  return (
    <>
      <Places dates={dates} />
      <KakaoMap />
    </>
  );
};

export default PlaceContainer;
