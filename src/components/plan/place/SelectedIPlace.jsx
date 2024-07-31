import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FaBars as DragIcon } from 'react-icons/fa';
import { MdOutlineRemove as RemoveIcon } from 'react-icons/md';
import * as S from '@styles/plan/place/PlaceListItem.style';
import usePlaceStore from '@zustands/plan/usePlaceStore';

const PlaceListItem = ({ place, index }) => {
  const { name, id } = place;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const { removePlace } = usePlaceStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <S.PlaceItem ref={setNodeRef} style={style}>
      <div className="array-number">{index}</div>

      <S.Item $isDragging={isDragging.toString()}>
        <div className="content">
          <button {...attributes} {...listeners}>
            <DragIcon />
          </button>
          <div className="title">{name}</div>
        </div>

        {!isDragging && (
          <button className="remove" onClick={() => removePlace(id)}>
            <RemoveIcon />
          </button>
        )}
      </S.Item>
    </S.PlaceItem>
  );
};

export default PlaceListItem;
