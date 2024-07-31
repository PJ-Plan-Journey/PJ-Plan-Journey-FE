import styled from 'styled-components';

export const MenuContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  top: 6cm;
  left: 7cm;
  background: #fff;
  padding: 3.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    background: #e0e0e0;
    border-radius: 5px;
  }
`;

export const MenuItemIcon = styled.div`
  margin-right: 20px;
`;

export const MenuItemRed = styled(MenuItem)`
  color: red;
  font-weight: bold;
  cursor: default;
`;
