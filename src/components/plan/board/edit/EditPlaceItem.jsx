import { FaBars as DragIcon, FaTrashAlt as RemoveIcon } from 'react-icons/fa';
import * as S from '@styles/plan/place/PlaceListItem.style';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import useStompStore from '@zustands/plan/useStompStore';

const EditPlaceItem = ({ day, place, index, provided, data }) => {
  const { placeName } = place;
  const { removePlace, setDay, placeList } = usePlaceStore();
  const { sendMessage } = useStompStore();

  const remveItem = () => {
    setDay(day);
    removePlace(day, place.id);

    const deletePlan = {
      type: 'DELETE',
      planId: data.id,
      fromDate: place.date,
      fromSeq: place.sequence,
    };

    sendMessage(`/pub/edit/room/${data.id}`, JSON.stringify(deletePlan));
  };

  const colors = ['#156bf0', '#f01562', '#15f062', '#f0d215'];
  const getColor = (day) =>
    colors[Object.keys(placeList).indexOf(day) % colors.length];

  return (
    <>
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
            <div className="title">{placeName}</div>
          </div>
          <button className="remove" onClick={remveItem}>
            <RemoveIcon />
          </button>
        </S.Item>
      </S.PlaceItem>
    </>
  );
};

export default EditPlaceItem;
