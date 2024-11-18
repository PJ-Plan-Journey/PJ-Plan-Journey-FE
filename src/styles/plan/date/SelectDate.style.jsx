import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 300px;
  background-color: white;
  flex: 1;
  padding: 40px;
  box-shadow: 0 0 3px #d8d8d8;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;

  .title {
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .city {
    margin-top: 100px;
    font-size: 1.8rem;
  }

  .days {
    display: flex;
    gap: 10px;
    justify-content: center;
    font-size: 1.1rem;
    margin-bottom: 20px;
    font-weight: bold;
  }
`;
