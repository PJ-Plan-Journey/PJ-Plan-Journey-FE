import React from 'react';
import styled from 'styled-components';

/**
 * 공통 모달 컴포넌트
 *
 * `Modal`은 `Title`과 `Content`를 필수로 포함해야 하며, `type`에 따라 버튼 구성이 달라집니다.
 * - `confirm`: 취소 및 확인 버튼을 포함.
 * - `info`: 확인 버튼만 포함.
 *
 * @param {Object} props
 * @param {ReactNode} children - 모달의 내용 (Title과 Content 컴포넌트 포함)
 * @param {Function} closeModal - 모달을 닫는 함수
 * @param {Function} onConfirm - 확인 버튼 클릭 시 실행되는 함수 (confirm 타입일 때 필수)
 * @param {string} [type="confirm"] - 모달의 타입. `confirm` 또는 `info`
 */

export const Modal = ({
  children,
  closeModal,
  onConfirm,
  type = 'confirm',
}) => {
  const hasTitle = React.Children.toArray(children).some(
    (child) => child.type === Title
  );
  const hasContent = React.Children.toArray(children).some(
    (child) => child.type === Content
  );

  if (!hasTitle || !hasContent) {
    throw new Error('Modal에는 Title과 Content가 모두 포함되어야 합니다.');
  }

  return (
    <>
      <Overlay onClick={closeModal} />
      <ModalStyle>
        <div className="body">{children}</div>

        <div className="button-group">
          {type === 'confirm' && (
            <>
              <button onClick={closeModal}>취소</button>
              <button onClick={onConfirm}>확인</button>
            </>
          )}
          {type === 'info' && <button onClick={closeModal}>확인</button>}
        </div>
      </ModalStyle>
    </>
  );
};

export const Title = ({ children }) => {
  return <TitleStyle>{children}</TitleStyle>;
};

export const Content = ({ children }) => {
  return <ContentStyle>{children}</ContentStyle>;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fffffff0;
  border-radius: 15px;
  z-index: 20;
  min-width: 300px;
  max-width: 400px;
  min-height: 200px;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .body {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .button-group {
    display: flex;
    border-top: 2px solid #d1d1d1;

    button {
      cursor: pointer;
      flex-grow: 1;
      padding: 15px;
      border: none;
      background-color: inherit;
      color: #156bf0;
      font-weight: bold;
      font-size: 15px;

      &:not(:first-child) {
        border-left: 1px solid #d1d1d1;
      }

      &:not(:last-child) {
        border-right: 1px solid #d1d1d1;
      }

      &:hover {
        background-color: #d4d4d4;
      }
    }
  }
`;

const TitleStyle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
`;

const ContentStyle = styled.div`
  font-size: 14px;
  flex-grow: 1;
  padding: 20px;
  color: #555555;
  line-height: 1.4;
`;
