import CommentList from '@components/plan/board/detail/CommentList';
import DayList from '@components/plan/board/detail/DayList';
import PlanList from '@components/plan/board/detail/PlanList';
import KakaoMap from '@components/plan/KakaoMap';
import { FaGripLinesVertical as WidthSizeIcon } from 'react-icons/fa6';
import useDateStore from '@zustands/plan/useDateStore';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { useEffect, useRef, useState } from 'react';
import * as S from '@styles/plan/PlanDetailPage.style';
import useStompStore from '@zustands/plan/useStompStore';
import useAuthStore from '@zustands/authStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '@axios/api';

const MINWIDTH = 37;

const PlanDetailPage = () => {
  const [showComment, setShowComment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [width, setWidth] = useState(MINWIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const widthRef = useRef(width);
  const { id } = useParams();
  const { connect, subscribe, disconnect } = useStompStore();
  const { addPlace, day, initList, setDay } = usePlaceStore();
  const { setDates } = useDateStore();
  const { user } = useAuthStore();

  const resizeContainerStyle = isEditMode || !day ? { width: `${width}%` } : {};

  const getPlan = async () => {
    try {
      const { data } = await api.get(`/plans/${id}`);
      return data.data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getPlanDetail', id],
    queryFn: getPlan,
  });

  const changeEditMode = () => {
    setIsEditMode(true);
  };

  const savePlan = () => {
    // 저장 로직

    setIsEditMode(false);
  };

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    // 날짜별로 장소 정보를 그룹화하고 latitude/longitude를 x/y로 변경
    const placesByDate = data.planDetails.reduce((acc, place) => {
      const transformedPlace = {
        ...place,
        id: place.id,
        x: place.longitude,
        y: place.latitude,
      };
      delete transformedPlace.planDetailId;
      delete transformedPlace.latitude;
      delete transformedPlace.longitude;

      if (!acc[place.date]) {
        acc[place.date] = [];
      }
      acc[place.date].push(transformedPlace);

      return acc;
    }, {});

    if (placesByDate && Object.keys(placesByDate).length > 0) {
      // 그룹화된 장소 정보를 addPlace 함수로 전달
      Object.entries(placesByDate).forEach(([date, places]) => {
        addPlace(date, places);
      });
    }

    const sortedDates = data.planDetails?.map((detail) => detail.date).sort();
    const startDate = sortedDates[0];
    const endDate = sortedDates[sortedDates.length - 1];

    setDates({ startDate, endDate });
  }, [data, addPlace, id]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      // Ensure the new width is in a reasonable range
      const newWidth = Math.min(
        Math.max(MINWIDTH, (event.clientX / window.innerWidth) * 100),
        100
      );
      widthRef.current = newWidth; // Update the ref value
      setWidth(newWidth); // Trigger re-render with the new width
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (isEditMode) {
      const handleMessage = (message) => {
        console.log('Received message:', message.body);
        try {
          // 메시지 본문을 JSON.parse()로 변환하여 사용
          const parsedMessage = JSON.parse(message.body);
          console.log('Parsed message:', parsedMessage);
          // 메시지 처리 로직 추가
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      subscribe(`/sub/room/${id}`, handleMessage);

      connect();

      // STOMP 연결 후 /sub/room/{planId} 구독 수신될 때 콜백함수 호출

      console.log(`Subscribed to /sub/room/${id}`);
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [isEditMode, subscribe, connect, disconnect, id]);

  useEffect(() => {
    return () => {
      setDates({ startDate: null, endDate: null });
      initList();
      setDay('');
    };
  }, [setDates, initList, setDay]);

  return (
    <S.PlanDetailPageContainer>
      <div className="resize-container" style={resizeContainerStyle}>
        <DayList
          data={data}
          toggleComment={toggleComment}
          isEditMode={isEditMode}
          changeEditMode={changeEditMode}
          savePlan={savePlan}
        />
        {showComment ? (
          <CommentList planId={data.id} />
        ) : (
          <>
            <PlanList isEditMode={isEditMode} data={data} />
            {(isEditMode || !day) && (
              <div className="width-size-button" onMouseDown={handleMouseDown}>
                <WidthSizeIcon />
              </div>
            )}
          </>
        )}
      </div>

      <KakaoMap />
    </S.PlanDetailPageContainer>
  );
};

export default PlanDetailPage;
