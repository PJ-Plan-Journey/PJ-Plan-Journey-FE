import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import usePlaceStore from '@zustand/plan/usePlaceStore';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { MdOutlineRemove } from 'react-icons/md';
import { flex } from '@styles/common/common.style';

const Container = styled.div`
  ${flex}
  gap: 10px;
  width: 100%;
`;

const Item = styled.li`
  ${flex}
  justify-content: space-between;
  width: 100%;
  min-height: 50px;
  padding: 10px;
  box-shadow: 0 0 3px #828282;
  border-radius: 10px;
  background-color: ${({ $isDragging }) =>
    $isDragging === 'true' ? '#0066ff' : 'white'};
  color: ${({ $isDragging }) => ($isDragging === 'true' ? 'white' : 'black')};

  button {
    ${flex}
    justify-content: center;
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-size: 20px;
  }

  svg {
    color: ${({ $isDragging }) =>
      $isDragging === 'true' ? 'white' : '#9c9c9c'};
  }

  .title {
    font-weight: bold;
  }

  .remove {
    ${flex}
    justify-content: center;
    cursor: pointer;
    padding: 5px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 0 2px #9c9c9c;
    transition: all 0.2s ease-out;

    &:hover {
      background-color: #dadada;

      svg {
        color: white;
      }
    }
  }
`;

const Number = styled.div`
  --marker-size: 35px;
  ${flex}
  justify-content: center;
  min-width: var(--marker-size);
  height: var(--marker-size);
  border: 3px solid white;
  border-radius: 50%;
  background: #156bf0;
  color: white;
  font-weight: bold;
  box-shadow: 0 0 2px 1px gray;
`;

const Title = styled.div`
  ${flex}
  gap: 5px;
`;

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

  // {...attributes} {...listeners} 클릭 이벤트 props
  return (
    <Container ref={setNodeRef} style={style}>
      <Number>{index}</Number>
      <Item $isDragging={isDragging.toString()}>
        <Title>
          <button {...attributes} {...listeners}>
            <FaBars />
          </button>
          <div>
            <div className="title">{name}</div>
          </div>
        </Title>

        {!isDragging && (
          <button className="remove" onClick={() => removePlace(id)}>
            <MdOutlineRemove />
          </button>
        )}
      </Item>
    </Container>
  );
};

export default PlaceListItem;
