import Button from '@components/common/Button';
import * as S from '@styles/plan/Modal.style';

const Modal = ({ type = 'confirm', children, onConfirm, onCancel }) => {
  return (
    <S.BackGround>
      <S.ModalStyle>
        <div className="message"> {children}</div>

        {type === 'confirm' ? (
          <div className="group">
            <Button onClick={onCancel} variant='outline'>
              취소
            </Button>

            <Button onClick={onConfirm}>
              확인
            </Button>
          </div>
        ) : (
          <div className="group">
            <Button onClick={onConfirm}>
              확인
            </Button>
          </div>
        )}
      </S.ModalStyle>
    </S.BackGround>
  );
};

export default Modal;
