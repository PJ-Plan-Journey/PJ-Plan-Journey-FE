import styled from 'styled-components';

export const MainContentContainer = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
  margin-left: 2cm;
  margin-right: 2cm;
`;

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const LoginTextContainer = styled.div`
  margin-bottom: 1rem;
  background: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Card = styled.div`
  background: #fff;
  padding: 1rem;
  margin-top: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

export const LoginText = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 2;
  font-weight: normal;
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;
`;

export const InputWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  &::placeholder {
    color: #888;
  }
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  background-color: #156BF0;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
