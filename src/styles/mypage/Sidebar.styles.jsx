import styled from 'styled-components';

export const SidebarContainer = styled.div`
  min-width: 250px;
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
`;

export const MenuItemIcon = styled.div`
  margin-right: 1rem;
  font-size: 1.2rem;
`;

export const MenuText = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;
