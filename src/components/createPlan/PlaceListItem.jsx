import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';

const Item = styled.li`
  width: 100%;
  padding: 20px;
  border: 1px solid black;
`;

const PlaceListItem = ({ place }) => {
  const { name } = place;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: place.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {name}
    </Item>
  );
};

export default PlaceListItem;
