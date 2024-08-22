import styled from 'styled-components';

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  > form {
    width: 100%;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 12px 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;
  resize: none;

  &:focus {
    border-color: #504080;
    box-shadow: 0 0 5px #303090;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 16px;
  margin-bottom: 20px;
  padding: 12px 20px;
  background-color: #303090;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #404090;
  }

`;
