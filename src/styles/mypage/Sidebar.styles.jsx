import styled from 'styled-components';

export const SidebarContainer = styled.div`
  min-width: 250px;
  height: 28vh;
  background-color: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 6rem;
  padding-top: 2.6rem;

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
  font-size: 1.2rem;
  font-weight: bold;
  padding-top: 0.2rem;

`;
