import Portal from '@/utils/Portal';
import { Children, cloneElement } from 'react';
import styled, { css } from 'styled-components';

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
 * @param {Object} customStyles - 커스텀 스타일을 위한 props 객체
 * @param {Boolean} isCustom - 커스텀 스타일 사용 여부
 */

export const Modal = ({
  children,
  closeModal,
  onConfirm,
  type = 'confirm',
  customStyles,
  isCustom = false,
}) => {
  const hasTitle = Children.toArray(children).some(
    (child) => child.type === Title
  );
  const hasContent = Children.toArray(children).some(
    (child) => child.type === Content
  );

  if (!hasTitle || !hasContent) {
    throw new Error('Modal에는 Title과 Content가 모두 포함되어야 합니다.');
  }

  return (
    <Portal>
      <Overlay
        onClick={closeModal}
        $isCustom={isCustom}
        $customStyles={customStyles?.overlay}
      />
      <ModalStyle $isCustom={isCustom} $customStyles={customStyles?.modal}>
        <div className="body">
          {Children.map(children, (child) =>
            cloneElement(child, {
              isCustom,
              customStyles: customStyles?.[child.type.name.toLowerCase()],
            })
          )}
        </div>

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
    </Portal>
  );
};

export const Title = ({ children, isCustom, customStyles }) => {
  return (
    <TitleStyle $isCustom={isCustom} $customStyles={customStyles}>
      {children}
    </TitleStyle>
  );
};

export const Content = ({ children, isCustom, customStyles }) => {
  return (
    <ContentStyle $isCustom={isCustom} $customStyles={customStyles}>
      {children}
    </ContentStyle>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  ${({ $isCustom, $customStyles }) =>
    $isCustom && $customStyles && css($customStyles)};
`;

const ModalStyle = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 1px #d1d1d1;
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

  ${({ $isCustom, $customStyles }) =>
    $isCustom && $customStyles && css($customStyles)};
`;

const TitleStyle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 40px 40px 20px 40px;
  ${({ $isCustom, $customStyles }) =>
    $isCustom && $customStyles && css($customStyles)};
`;

const ContentStyle = styled.div`
  font-size: 14px;
  flex-grow: 1;
  color: #555555;
  line-height: 1.4;
  padding: 20px 40px 40px 40px;
  ${({ $isCustom, $customStyles }) =>
    $isCustom && $customStyles && css($customStyles)};
`;
