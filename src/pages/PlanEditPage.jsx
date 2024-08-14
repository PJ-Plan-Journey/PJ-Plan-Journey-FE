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
import EditDayList from '@components/plan/board/edit/EditDayList';
import EditPlanList from '@components/plan/board/edit/EditPlanList';
import useReSizeWidth from '@hooks/plan/useReSizeWidth';

const PlanEditPage = () => {
  const { id } = useParams();
  const { connect, subscribe, disconnect, sendMessage, stompClient } =
    useStompStore();
  const { addPlace, initList, setDay } = usePlaceStore();
  const { setDates } = useDateStore();
  const { user } = useAuthStore();
  const { reSizeOnlyStyle, handleMouseDown } = useReSizeWidth();

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

  // 웹소켓 수신 함수
  const handleMessage = (message) => {
    console.log('Received message:', JSON.parse(message.body));

    const ReceivedData = JSON.parse(message.body);

    if (!ReceivedData.groupedByDate) {
      return;
    }

    if (
      ReceivedData.groupedByDate &&
      Object.keys(ReceivedData.groupedByDate).length > 0
    ) {
      // 그룹화된 장소 정보를 addPlace 함수로 전달
      Object.entries(ReceivedData.groupedByDate).forEach(([date, places]) => {
        addPlace(date, places);
      });
    }
  };

  // 웹소켓 연결
  useEffect(() => {
    const connectAndSend = async () => {
      await connect();
    };
    connectAndSend();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // 웹소켓 연결 후 구독과 입장메세지보내기
  useEffect(() => {
    if (stompClient) {
      subscribe(`/sub/room/${id}`, handleMessage);
      sendMessage(`/pub/room/${id}/entered`);
    }
  }, [stompClient]);

  useEffect(() => {
    return () => {
      setDates({ startDate: null, endDate: null });
      initList();
      setDay('');
    };
  }, [setDates, initList, setDay]);

  return (
    <S.PlanDetailPageContainer>
      <div className="resize-container" style={reSizeOnlyStyle}>
        <EditDayList planId={id} />

        <EditPlanList data={data} />
        <div className="width-size-button" onMouseDown={handleMouseDown}>
          <WidthSizeIcon />
        </div>
      </div>

      <KakaoMap />
    </S.PlanDetailPageContainer>
  );
};

export default PlanEditPage;
