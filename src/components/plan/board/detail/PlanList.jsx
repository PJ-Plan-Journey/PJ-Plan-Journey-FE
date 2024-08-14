import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import useDateStore from '@zustands/plan/useDateStore';
import { ko } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import Portal from '@/utils/Portal';
import * as S from '@styles/plan/board/detail/PlanList.style';
import PlanPlaceItem from './PlanPlaceItem';
import useStompStore from '@zustands/plan/useStompStore';
import PlanListTitle from '@components/plan/board/detail/PlanListTitle';
import AddPlace from '@components/plan/board/detail/AddPlace';

const PlanList = ({ isEditMode, data }) => {
  const {
    placeList,
    movePlace,
    movePlaceBetweenDays,
    day: selectDay,
    setDay,
  } = usePlaceStore();

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

    const payload = {
      type: 'UPDATE',
      planId: data.id,
      fromSeq: 4,
      toSeq: 2,
      fromDate: '2024-07-30',
      toDate: '2024-07-30',
    };

    sendMessage(`/pub/edit/room/${data.id}`, payload);
  };

  const visibleSearchBox = (day) => {
    setSelectedDay(day);
    setIsVisible(true);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString); // 문자열을 Date 객체로 변환
    return format(date, 'yyyy.M.d(EE)', { locale: ko });
  };

  return (
    <S.SelectedListContainer>
      <PlanListTitle data={data} />

      {isEditMode ? (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
          <S.DayList>
            {getDays().map((day, index) => (
              <div className="item" key={day}>
                <div className="day">
                  <span className="date" onClick={() => saveDay(day)}>
                    day{index + 1}
                  </span>

                  <div className="info">
                    <span>{formatDate(day)}</span>
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
                            <PlanPlaceItem
                              key={place.id}
                              day={day}
                              place={place}
                              index={index + 1}
                              provided={provided}
                              isEditMode={isEditMode}
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
                  <button onClick={() => visibleSearchBox(day)}>
                    장소 추가
                  </button>
                </div>
              </div>
            ))}
          </S.DayList>
        </DragDropContext>
      ) : (
        <S.DayList>
          {selectDay && <div>{selectDay}</div>}

          {selectDay ? (
            <ul className="list">
              {placeList[selectDay]?.map((place, index) => (
                <PlanPlaceItem
                  key={place.id}
                  day={selectDay}
                  place={place}
                  index={index + 1}
                  isEditMode={isEditMode}
                />
              ))}
            </ul>
          ) : (
            <>
              {getDays().map((day, index) => (
                <div className="item" key={day}>
                  <div className="day">
                    <span className="date" onClick={() => saveDay(day)}>
                      day{index + 1}
                    </span>

                    <div className="info">
                      <span>{formatDate(day)}</span>
                    </div>
                  </div>

                  <ul className="list">
                    {placeList[day]?.map((place, index) => (
                      <PlanPlaceItem
                        key={place.id}
                        day={day}
                        place={place}
                        index={index + 1}
                        isEditMode={isEditMode}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </S.DayList>
      )}

      <Portal>
        {isVisible && (
          <AddPlace
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            day={selectedDay}
            isEditMode={isEditMode}
            data={data}
          />
        )}
      </Portal>
    </S.SelectedListContainer>
  );
};

export default PlanList;
