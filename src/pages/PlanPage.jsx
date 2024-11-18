import KakaoMap from '@components/plan/KakaoMap';
import useStepStore from '@/zustands/plan/useStepStore';
import * as S from '@styles/plan/PlanPage.style';
import { useEffect, useRef, useState } from 'react';
import SelectedList from '@components/plan/place/SelectedList';
import { FaGripLinesVertical as WidthSizeIcon } from 'react-icons/fa6';
import TitleForm from '@components/plan/TitleForm';
import useDateStore from '@zustands/plan/useDateStore';
import usePlaceStore from '@zustands/plan/usePlaceStore';
import Step from '@components/plan/Step';
import DateContainer from '@components/plan/DateContainer';
import useDate from '@hooks/plan/date/useDate';

const MINWIDTH = 37;

const PlanPage = () => {
  const { step, setStep } = useStepStore();
  const { dates, setDates } = useDate();
  const { initList, setDay } = usePlaceStore();
  const [width, setWidth] = useState(MINWIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const widthRef = useRef(width);

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

  // 브라우저 새로고침을 눌렀을 때 알림 표시
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = '';
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
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();

    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  // 날짜 변경 컴포넌트는 width 변경이 필요없어서 조건문 설정
  const resizeContainerStyle = step >= 2 ? { width: `${width}%` } : {};

  useEffect(() => {
    return () => {
      initList();
      setStep(1);
      setDay('');
    };
  }, [initList, setStep]);

  return (
    <S.PlanPageContainer>
      <Step dates={dates} />
      {step == 1 && <DateContainer dates={dates} setDates={setDates} />}
      {step >= 2 && (
        <>
          <div className="resize-container" style={resizeContainerStyle}>
            <SelectedList />
            <div className="width-size-button" onMouseDown={handleMouseDown}>
              <WidthSizeIcon />
            </div>
          </div>
          <KakaoMap />
        </>
      )}

      {step >= 3 && <TitleForm />}
    </S.PlanPageContainer>
  );
};

export default PlanPage;
