import CommentList from '@components/plan/board/detail/CommentList';
import PlanList from '@components/plan/board/detail/PlanList';
import KakaoMap from '@components/plan/KakaoMap';
import { FaGripLinesVertical as WidthSizeIcon } from 'react-icons/fa6';
import useDateStore from '@zustands/plan/useDateStore';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import { useEffect, useRef, useState } from 'react';
import * as S from '@styles/plan/PlanDetailPage.style';
import useAuthStore from '@zustands/authStore';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '@axios/api';
import DayList from '@components/plan/board/detail/DayList';
import useReSizeWidth from '@hooks/plan/useReSizeWidth';

const PlanDetailPage = () => {
  const [showComment, setShowComment] = useState(false);
  const { id } = useParams();
  const { addPlace, day, initList, setDay } = usePlaceStore();
  const { setDates } = useDateStore();
  const { user } = useAuthStore();
  const { reSizeStyle, handleMouseDown } = useReSizeWidth();

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

  console.log(data);

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

  useEffect(() => {
    return () => {
      setDates({ startDate: null, endDate: null });
      initList();
      setDay('');
    };
  }, [setDates, initList, setDay]);

  return (
    <S.PlanDetailPageContainer>
      <div className="resize-container" style={reSizeStyle}>
        <DayList data={data} toggleComment={toggleComment} />
        {showComment ? (
          <CommentList planId={data.id} />
        ) : (
          <>
            <PlanList data={data} />
            {!day && (
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
