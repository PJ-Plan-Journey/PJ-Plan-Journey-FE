import { FaBars as DragIcon } from '@react-icons/all-files/fa/FaBars';
import { FaTrashAlt as RemoveIcon } from '@react-icons/all-files/fa/FaTrashAlt';
import * as S from '@styles/plan/place/PlaceListItem.style';
import usePlaceStore from '@zustands/plan/usePlaceStore';

const PlaceListItem = ({ day, place, index, provided }) => {
  const { place_name } = place;
  const { removePlace, setDay, placeList } = usePlaceStore();

  const remveItem = () => {
    setDay(day);
    removePlace(day, place.id);
  };

  const colors = ['#156bf0', '#f01562', '#15f062', '#f0d215'];
  const getColor = (day) =>
    colors[Object.keys(placeList).indexOf(day) % colors.length];

  return (
    <S.PlaceItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      $color={getColor(day)}
    >
      <button className="drag" {...provided.dragHandleProps}>
        <DragIcon />
      </button>

      <S.Item>
        <div className="content">
          <div className="array-number">{index}</div>
          <div className="title">{place_name}</div>
        </div>
        <button className="remove" onClick={remveItem}>
          <RemoveIcon />
        </button>
      </S.Item>
    </S.PlaceItem>
  );
};

export default PlaceListItem;
