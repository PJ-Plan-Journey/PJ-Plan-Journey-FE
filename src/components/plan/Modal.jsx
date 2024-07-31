import * as S from '@styles/plan/Modal.style';

const Modal = ({ type = 'confirm', children, onConfirm, onCancel }) => {
  return (
    <S.BackGround>
      <S.ModalStyle>
        <div className="message"> {children}</div>

        {type === 'confirm' ? (
          <div className="group">
            <button className="cancel" onClick={onCancel}>
              취소
            </button>

            <button className="confirm" onClick={onConfirm}>
              확인
            </button>
          </div>
        ) : (
          <div className="group">
            <button className="confirm" onClick={onConfirm}>
              확인
            </button>
          </div>
        )}
      </S.ModalStyle>
    </S.BackGround>
  );
};

export default Modal;
