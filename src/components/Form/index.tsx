import React, { useState } from 'react';
import { FormContainer, SubmitButton, TextArea } from './styles';

export const Form = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState(''); // Estado para armazenar a resposta do servidor

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Envia a mensagem ao servidor usando a API do preload.ts
      const serverResponse = await window.electronAPI.sendMessage(message);
      setResponse(serverResponse); // Atualiza o estado com a resposta do servidor
    } catch (error) {
      console.error('Erro ao enviar mensagem ao servidor:', error);
      alert('Erro ao enviar mensagem ao servidor.');
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Prompt"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SubmitButton type="submit">Enviar</SubmitButton>
      </form>
      <TextArea 
        value={response}
        disabled 
      />
    </FormContainer>
  );
};
