import usePlaceStore from '@zustands/plan/usePlaceStore';
import { useEffect, useState } from 'react';

const MINWIDTH = 37;

const useReSizeWidth = () => {
  const [width, setWidth] = useState(MINWIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const { day } = usePlaceStore();
  const reSizeStyle = !day ? { width: `${width}%` } : {};
  const reSizeOnlyStyle = { width: `${width}%` };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newWidth = Math.min(
        Math.max(MINWIDTH, (event.clientX / window.innerWidth) * 100),
        100
      );
      setWidth(newWidth);
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

  return {
    reSizeStyle,
    reSizeOnlyStyle,
    handleMouseDown,
  };
};

export default useReSizeWidth;
