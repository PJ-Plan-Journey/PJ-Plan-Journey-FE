import usePlaceStore from '@zustands/plan/usePlaceStore';

const useDrag = () => {
  const { movePlace, movePlaceBetweenDays, setDay } = usePlaceStore();

  const onDragStart = ({ draggableId }) => {
    const [_, day] = draggableId.split(' ');
    setDay(day);
  };

  const onDragEnd = ({ source, destination }) => {
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      movePlace(source.droppableId, source.index, destination.index);
    } else {
      movePlaceBetweenDays(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      );
    }

    setDay(destination.droppableId);
  };

  return { onDragStart, onDragEnd };
};

export default useDrag;
