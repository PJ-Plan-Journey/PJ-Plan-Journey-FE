import { FaBars as DragIcon, FaTrashAlt as RemoveIcon } from 'react-icons/fa';
import * as S from '@styles/plan/place/PlaceListItem.style';
import usePlaceStore from '@zustands/plan/usePlaceStore';

const PlaceListItem = ({ day, place, index, provided }) => {
  const { place_name } = place;
  const { removePlace, setDay } = usePlaceStore();

  const remveItem = () => {
    setDay(day);
    removePlace(day, place.id);
  };

  return (
    <S.PlaceItem ref={provided.innerRef} {...provided.draggableProps}>
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
