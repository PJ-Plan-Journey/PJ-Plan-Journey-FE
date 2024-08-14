import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import useDateStore from '@zustands/plan/useDateStore';
import { parseISO } from 'date-fns';
import Portal from '@/utils/Portal';
import * as S from '@styles/plan/board/detail/PlanList.style';
import useStompStore from '@zustands/plan/useStompStore';
import PlanListTitle from '@components/plan/board/detail/PlanListTitle';
import AddPlace from '@components/plan/board/detail/AddPlace';
import EditPlaceItem from '@components/plan/board/edit/EditPlaceItem';
import { formatDate } from '@/utils/formatDate';

const EditPlanList = ({ data }) => {
  const { placeList, movePlace, movePlaceBetweenDays, setDay } =
    usePlaceStore();
  const { getDays } = useDateStore();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const { sendMessage } = useStompStore();

  const saveDay = (day) => {
    setDay(day);
  };

  const onDragStart = ({ draggableId }) => {
    const [_, day] = draggableId.split(' ');
    saveDay(day);
  };

  const onDragEnd = ({ source, destination, draggableId }) => {
    const [sequence, _] = draggableId.split(' ');
    const destinationSequence =
      placeList[destination.droppableId]?.[destination.index]?.sequence;

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

    const payload = {
      type: 'UPDATE',
      planId: data.id,
      fromSeq: parseInt(sequence),
      toSeq: destinationSequence,
      fromDate: source.droppableId,
      toDate: destination.droppableId,
    };

    saveDay(destination.droppableId);
    sendMessage(`/pub/edit/room/${data.id}`, JSON.stringify(payload));
  };

  const visibleSearchBox = (day) => {
    setSelectedDay(day);
    setIsVisible(true);
  };

  const changeDate = (dateString) => {
    const date = parseISO(dateString); // 문자열을 Date 객체로 변환
    return formatDate('yyyy.M.d(EE)', date);
  };

  return (
    <S.SelectedListContainer>
      <PlanListTitle data={data} />

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <S.DayList>
          {getDays().map((day, index) => (
            <div className="item" key={day}>
              <div className="day">
                <span className="date" onClick={() => setDay(day)}>
                  day{index + 1}
                </span>

                <div className="info">
                  <span>{changeDate(day)}</span>
                </div>
              </div>

              <Droppable droppableId={day}>
                {(provided, snapshot) => (
                  <div
                    className="list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? '#f8f8f8'
                        : 'white',
                      borderRadius: '10px',
                      padding: '20px 10px',
                    }}
                  >
                    {placeList[day]?.map((place, index) => (
                      <Draggable
                        key={place.id}
                        draggableId={`${place.sequence} ${day}`}
                        index={index}
                      >
                        {(provided) => (
                          <EditPlaceItem
                            key={place.id}
                            day={day}
                            place={place}
                            index={index + 1}
                            provided={provided}
                            data={data}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="button-group">
                <button onClick={() => visibleSearchBox(day)}>장소 추가</button>
              </div>
            </div>
          ))}
        </S.DayList>
      </DragDropContext>

      <Portal>
        {isVisible && (
          <AddPlace
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            day={selectedDay}
            data={data}
          />
        )}
      </Portal>
    </S.SelectedListContainer>
  );
};

export default EditPlanList;
