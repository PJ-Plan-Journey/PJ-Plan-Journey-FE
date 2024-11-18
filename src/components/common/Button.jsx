import { flex } from '@styles/common/common.style';
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
  width: ${({ $type }) => ($type === 'icon' ? 'auto' : '100%')};
  background-color: ${({ $variant }) => colors[$variant].backgroundColor};
  color: ${({ $variant }) => colors[$variant].color};
  border: none;
  border-radius: ${({ $type }) => ($type === 'icon' ? '50%' : '15px')};
  box-shadow: ${({ $variant }) => colors[$variant].boxShadow};
  padding: ${({ $type }) => ($type === 'icon' ? '8px' : '12px 15px')};
  transition: all 0.2s ease;
  font-size: ${({ $type }) => ($type === 'icon' ? '1.2rem' : 'auto')};
  ${({ $type }) => $type === 'icon' && flex}

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
 * @param {string} type - 버튼 타입을 설정하는 prop. 'button' 또는 'icon' 중 하나를 선택할 수 있으며, 기본값은 'button'입니다.
 *
 */
const Button = ({
  variant = 'fill',
  type = 'button',
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <ButtonStyle
      $variant={variant}
      $type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;
