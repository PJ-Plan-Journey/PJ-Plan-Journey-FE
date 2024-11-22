import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import SearchPlace from '@components/plan/place/SearchPlace';
import { parseISO } from 'date-fns';
import PlaceItem from '@components/plan/place/PlaceItem';
import * as S from '@styles/plan/place/Places.style';
import { formatDate } from '@/utils/formatDate';
import Button from '@components/common/Button';
import useModal from '@hooks/useModal';
import useStepStore from '@zustands/plan/useStepStore';
import DateInfo from './DateInfo';
import useDrag from '@hooks/plan/place/useDrag';

const MODALCUSTOM = {
  title: { padding: '30px 20px 20px 20px' },
  content: { padding: '0px' },
};

const Places = ({ dates }) => {
  const { days } = dates;
  const { placeList, setDay, addPlace } = usePlaceStore();
  const { isOpen, openModal, closeModal, Modal, Title, Content } = useModal();
  const { onDragStart, onDragEnd } = useDrag();
  const [selectedDay, setSelectedDay] = useState(null);
  const [dayPlaceList, setDayPlaceList] = useState([]);
  const { nextStep } = useStepStore();

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
      <DateInfo dates={dates} />

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <S.DayList>
          {days.map((day, index) => (
            <div className="item" key={day}>
              <div className="day">
                <span className="date" onClick={() => setDay(day)}>
                  {index + 1}일차
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
                        ? '#ffffff'
                        : 'inherit',
                    }}
                  >
                    {placeList[day]?.map((place, index) => (
                      <Draggable
                        key={place.id}
                        draggableId={`${place.id} ${day}`}
                        index={index}
                      >
                        {(provided) => (
                          <PlaceItem
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

      <div style={{ width: '100%', padding: '20px' }}>
        <Button onClick={nextStep}>저장</Button>
      </div>

      {isOpen && (
        <Modal
          closeModal={closeModal}
          onConfirm={() => SubmitDayList(selectedDay)}
          customStyles={MODALCUSTOM}
          isCustom
        >
          <Title>
            <div>{selectedDay}</div>
          </Title>

          <Content>
            <SearchPlace
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

export default Places;
