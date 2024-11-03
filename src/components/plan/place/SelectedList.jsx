import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import useDateStore from '@zustands/plan/useDateStore';
import DateRangeDisplay from '@components/plan/date/DateRangeDisplay';
import SelectPlace from '@components/plan/place/SelectPlace';
import { parseISO } from 'date-fns';
import PlaceListItem from '@components/plan/place/PlaceListItem';
import Portal from '@/utils/Portal';
import * as S from '@styles/plan/place/SelectedList.style';
import { formatDate } from '@/utils/formatDate';
import Button from '@components/common/Button';

const SelectedList = () => {
  const { placeList, movePlace, movePlaceBetweenDays, setDay, day } =
    usePlaceStore();
  const days = useDateStore((state) => state.getDays());
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const saveDay = (day) => {
    setDay(day);
  };

  const onDragStart = ({ draggableId }) => {
    const [_, day] = draggableId.split(' ');
    saveDay(day);
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

    saveDay(destination.droppableId);
  };

  const visibleSearchBox = (day) => {
    setSelectedDay(day);
    setIsVisible(true);
  };

  const parseAndFormatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDate('yy.M.d(EE)', date);
  };

  return (
    <S.SelectedListContainer>
      <DateRangeDisplay />
      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <S.DayList>
          {days.map((day, index) => (
            <div className="item" key={day}>
              <div className="day">
                <span className="date" onClick={() => saveDay(day)}>
                  day{index + 1}
                </span>

                <div className="info">
                  <span>{parseAndFormatDate(day)}</span>
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
                        draggableId={`${place.id} ${day}`}
                        index={index}
                      >
                        {(provided) => (
                          <PlaceListItem
                            key={place.id}
                            day={day}
                            place={place}
                            index={index + 1}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <div className="button-group">
                <Button onClick={() => visibleSearchBox(day)} variant='outline'>장소 추가</Button>
              </div>
            </div>
          ))}
        </S.DayList>
      </DragDropContext>
      <Portal>
        {isVisible && (
          <SelectPlace
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            day={selectedDay}
          />
        )}
      </Portal>
    </S.SelectedListContainer>
  );
};

export default SelectedList;
