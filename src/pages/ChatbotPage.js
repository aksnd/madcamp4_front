import React from 'react';
import styled from 'styled-components';

const ChatbotPage = () => {
  return (
    <Container>
      <Header>Stock Chatbot</Header>
      <ChatContainer>
        <Messages>
          <Message>User: How's the market today?</Message>
          <Message>Bot: The market is up by 2% today.</Message>
        </Messages>
        <InputContainer>
          <Input type="text" placeholder="Ask a question..." />
          <Button>Send</Button>
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