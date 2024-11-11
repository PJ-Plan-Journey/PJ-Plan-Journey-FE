import styled from 'styled-components';

const colors = {
  fill: {
    backgroundColor: '#156bf0',
    color: '#ffffff',
    hover: '#0058dd',
    boxShadow: '0 0 2px #156bf0',
  },
  outline: {
    backgroundColor: '#ffffff',
    color: '#424242',
    hover: '#f8f8f8',
    boxShadow: '0 0 2px #979797',
  },
};

const ButtonStyle = styled.button`
  cursor: pointer;
  width: 100%;
  background-color: ${({ $variant }) => colors[$variant].backgroundColor};
  color: ${({ $variant }) => colors[$variant].color};
  border: none;
  border-radius: 15px;
  box-shadow: ${({ $variant }) => colors[$variant].boxShadow};
  padding: 12px 15px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $variant }) => colors[$variant].hover};
  }
`;

/**
 * 공통 Button 컴포넌트
 *
 * @param {string} variant - 버튼 스타일을 설정하는 prop. 'fill' 또는 'outline' 중 하나를 선택할 수 있으며, 기본값은 'fill'입니다.
 * @param {React.ReactNode} children - 버튼 내부에 표시할 내용.
 * @param {function} onClick - 버튼 클릭 시 실행할 함수.
 * @param {boolean} disabled - 버튼 비활성화 여부. 기본값은 false입니다.
 *
 */
const Button = ({ variant = 'fill', children, onClick, disabled = false }) => {
  return (
    <ButtonStyle $variant={variant} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
