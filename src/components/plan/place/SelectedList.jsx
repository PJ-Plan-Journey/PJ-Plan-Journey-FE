import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import useDateStore from '@zustands/plan/useDateStore';
import SelectPlace from '@components/plan/place/SelectPlace';
import { parseISO } from 'date-fns';
import PlaceListItem from '@components/plan/place/PlaceListItem';
import * as S from '@styles/plan/place/SelectedList.style';
import { formatDate } from '@/utils/formatDate';
import Button from '@components/common/Button';
import useModal from '@hooks/useModal';

const MODALCUSTOM = {
  padding: '30px 20px 20px 20px',
};

const SelectedList = () => {
  const { placeList, movePlace, movePlaceBetweenDays, setDay, addPlace } =
    usePlaceStore();
  const { isOpen, openModal, closeModal, Modal, Title, Content } = useModal();
  const days = useDateStore((state) => state.getDays());
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayPlaceList, setDayPlaceList] = useState([]);

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

  const SubmitDayList = (day) => {
    if (dayPlaceList.length > 0) {
      setDay(day);
      addPlace(day, dayPlaceList);
    }

    setDayPlaceList([]);
    closeModal();
  };

  const visibleSearchBox = (day) => {
    setSelectedDay(day);
    openModal();
  };

  const parseAndFormatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDate('yy.M.d(EE)', date);
  };

  return (
    <S.SelectedListContainer>
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
                <Button onClick={() => visibleSearchBox(day)} variant="outline">
                  장소 추가
                </Button>
              </div>
            </div>
          ))}
        </S.DayList>
      </DragDropContext>

      {isOpen && (
        <Modal
          closeModal={closeModal}
          onConfirm={() => SubmitDayList(selectedDay)}
          isCustom
        >
          <Title customStyles={MODALCUSTOM}>
            <div>{selectedDay}</div>
          </Title>

          <Content>
            <SelectPlace
              day={selectedDay}
              dayPlaceList={dayPlaceList}
              setDayPlaceList={setDayPlaceList}
              placeList={placeList}
            />
          </Content>
        </Modal>
      )}
    </S.SelectedListContainer>
  );
};

export default SelectedList;
