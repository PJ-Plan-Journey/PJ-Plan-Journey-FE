import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
`;
