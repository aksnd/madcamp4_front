import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'Bot', text: '안녕하세요! 어떻게 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    // Add user message to chat
    setMessages([...messages, { sender: 'User', text: input }]);

    try {
      // Send user input to backend
      const response = await axios.post('http://52.78.53.98:8000/api/chatbot/', { input });
      
      // Add bot response to chat
      setMessages([
        ...messages,
        { sender: 'User', text: input },
        { sender: 'Bot', text: response.data.answer },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...messages,
        { sender: 'User', text: input },
        { sender: 'Bot', text: 'Sorry, something went wrong.' },
      ]);
    }

    // Clear input field
    setInput('');
  };

  return (
    <Container>
      <Header>Stock Chatbot</Header>
      <ChatContainer>
        <Messages>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender}>
              {msg.text}
            </Message>
          ))}
        </Messages>
        <InputContainer>
          <Input
            type="text"
            placeholder="Ask a question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={handleSend}>Send</Button>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const ChatContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Message = styled.div`
  padding: 10px;
  border-bottom: 1px solid #eee;
  align-self: ${(props) => (props.sender === 'Bot' ? 'flex-start' : 'flex-end')};
  background-color: ${(props) => (props.sender === 'Bot' ? '#f1f1f1' : '#007bff')};
  color: ${(props) => (props.sender === 'Bot' ? '#000' : '#fff')};
  border-radius: 5px;
  max-width: 70%;
`;

const InputContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default ChatbotPage;