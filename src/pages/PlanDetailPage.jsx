import CommentList from '@components/plan/board/detail/CommentList';
import DayList from '@components/plan/board/detail/DayList';
import PlanList from '@components/plan/board/detail/PlanList';
import KakaoMap from '@components/plan/KakaoMap';
import { FaGripLinesVertical as WidthSizeIcon } from 'react-icons/fa6';
import useDateStore from '@zustands/plan/useDateStore';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import * as S from '@styles/plan/PlanDetailPage.style';

const initialData = {
  planId: 1,
  nickname: '작성자',
  cityname: '서울',
  title: 'title',
  isPublished: true,
  createdAt: '2024-07-27',
  publishedAt: '2024-07-27',
  likeCount: 30,
  comment: [
    {
      commentId: 1,
      content: '댓글입니다.',
      nickname: '작성자',
      createdAt: '2024-07-08',
      childComment: [
        {
          childCommentId: 1,
          content: '대댓글입니다.',
          nickname: '대댓글작성자',
          createdAt: '2024-07-09',
        },
      ],
    },
  ],
  planDetails: [
    {
      planDetailId: 1,
      placeName: '서울역',
      latitude: 37.552987017,
      longitude: 126.972591728,
      sequence: 1,
      date: '2024-07-24',
    },
    {
      planDetailId: 2,
      placeName: '서울남산타워',
      latitude: 37.551425,
      longitude: 126.988,
      sequence: 2,
      date: '2024-07-24',
    },
    {
      planDetailId: 3,
      placeName: '서울 강남',
      latitude: 36.789,
      longitude: 127.643,
      sequence: 1,
      date: '2024-07-25',
    },
  ],
};

const MINWIDTH = 37;

const PlanDetailPage = () => {
  const [data, setData] = useState(initialData);
  const [showComment, setShowComment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [width, setWidth] = useState(MINWIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const widthRef = useRef(width);

  const { addPlace, day, initList, setDay } = usePlaceStore();
  const { setDates } = useDateStore();

  const resizeContainerStyle = isEditMode || !day ? { width: `${width}%` } : {};

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
    // 날짜별로 장소 정보를 그룹화하고 latitude/longitude를 x/y로 변경
    const placesByDate = data.planDetails.reduce((acc, place) => {
      const transformedPlace = {
        ...place,
        id: place.planDetailId,
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

    // 그룹화된 장소 정보를 addPlace 함수로 전달
    Object.entries(placesByDate).forEach(([date, places]) => {
      addPlace(date, places);
    });

    const sortedDates = data.planDetails.map((detail) => detail.date).sort();
    const startDate = sortedDates[0];
    const endDate = sortedDates[sortedDates.length - 1];

    setDates({ startDate, endDate });
  }, [data, addPlace]);

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

  // useEffect(() => {
  //   const socketClient = io(import.meta.env.VITE_WEB_SOCKET_URL, {
  //     transports: ['websocket'],
  //     path: '/ws',
  //     reconnectionAttempts: 3,
  //   });

  //   socketClient.on('connect', () => {
  //     console.log('Connected to the server');
  //   });

  //   socketClient.on('connect_error', (err) => {
  //     console.error('Connection failed:', err);
  //   });

  //   return () => {
  //     socketClient.disconnect();
  //   };
  // }, []);

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
          toggleComment={toggleComment}
          isEditMode={isEditMode}
          changeEditMode={changeEditMode}
          savePlan={savePlan}
        />
        {showComment ? (
          <CommentList />
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
