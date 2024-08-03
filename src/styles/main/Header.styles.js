import styled, { keyframes, css } from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: 1200px) {
    padding: 1rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.5rem;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 1200px) {
    width: 600px;
  }

  @media (max-width: 768px) {
    width: 400px;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

export const IconWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

export const DropdownMenuWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.5rem 1rem;
  min-width: 150px;
  animation: ${({ isVisible }) =>
    isVisible
      ? css`${fadeIn} 0.3s ease forwards`
      : css`${fadeOut} 0.3s ease forwards`};
`;

export const DropdownItem = styled.a`
  text-decoration: none;
  padding: 0.5rem;
  color: #333;
  cursor: pointer;
  line-height: 1.5;
  width: 100%;
  text-align: left;

  &:hover {
    background: #f0f0f0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const NotificationMenuWrapper = styled(DropdownMenuWrapper)`
  width: 350px;
  max-height: 300px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
  line-height: 1.5;
  text-align: left;

  &:last-child {
    border-bottom: none;
  }
`;
