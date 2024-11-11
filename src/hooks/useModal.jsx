import { Modal, Title, Content } from '@components/common/Modal';
import { useState, useCallback } from 'react';

/**
 * 공통 모달 hook
 *
 * `Modal`에는 자식으로 반드시 `Title`과 `Content` 컴포넌트를 포함해야 합니다.
 *
 * `Modal`에는 반드시 `closeModal`을 props로 전달해야 `Overlay`가 클릭될 때 모달이 닫힙니다.
 *
 * @returns {Object}
 * - `isOpen`: 모달의 열림 상태 (boolean)
 * - `openModal`: 모달을 여는 함수
 * - `closeModal`: 모달을 닫는 함수
 * - `Modal`: Modal 컴포넌트
 * - `Title`: Title 컴포넌트
 * - `Content`: Content 컴포넌트
 */

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    openModal,
    closeModal,
    Modal,
    Title,
    Content,
  };
};

export default useModal;
