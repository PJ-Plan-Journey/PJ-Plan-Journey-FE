import * as S from '@styles/plan/place/PlaceItem.style';
import usePlaceStore from '@zustands/plan/usePlaceStore';

const PlanPlaceItem = ({ day, place, index }) => {
  const { placeName } = place;
  const { placeList } = usePlaceStore();

  const colors = ['#156bf0', '#f01562', '#15f062', '#f0d215'];
  const getColor = (day) =>
    colors[Object.keys(placeList).indexOf(day) % colors.length];

  return (
    <S.PlaceItem $color={getColor(day)}>
      <S.Item>
        <div className="content">
          <div className="array-number">{index}</div>
          <div className="title">{placeName}</div>
        </div>
      </S.Item>
    </S.PlaceItem>
  );
};

export default PlanPlaceItem;
