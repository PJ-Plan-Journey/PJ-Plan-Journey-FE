import styled from 'styled-components';

export const TravelContainer = styled.div`
  padding: 1rem;
  width: 100%;
`;

export const LoginText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const TravelList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const TravelCard = styled.div`
  width: 16cm;
  height: 6cm;
  display: flex;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease-in-out;
  line-height: 2rem;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ImageContainer = styled.div`
  width: 6cm;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const TravelInfo = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.5rem;
`;

export const TravelName = styled.h3`
  font-weight: bold;
  font-size: 1.3rem;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
  margin: 0;
`;

export const TravelDate = styled.p`
  margin: 0.2rem 0;
  padding-left: 1rem;
`;

export const LastModified = styled.p`
  margin: 0;
  padding-left: 1rem;
`;

export const ScheduleLabel = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  padding-right: 0.2rem;
`;

export const DateLabel = styled.span`
  font-size: 1.1rem;
  color: #7e7e7e;
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding-left: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button`

  background-color: ${(props) => (props.isPublished ? '#4caf50' : props.disabled ? '#a0a0a0' : '#008CBA')};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* 아이콘과 텍스트 사이 간격 */
  
  &:hover {
    background-color: ${(props) =>
      props.isPublished
        ? '#45a049'
        : props.disabled
        ? '#a0a0a0'
        : '#0056b3'};
  }
`;

export const ShareButton = styled(Button)`
  background-color: ${(props) => (props.disabled ? '#a0a0a0' : '#156BF0')};
`;
