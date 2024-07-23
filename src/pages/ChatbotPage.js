import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'Bot', text: '안녕하세요! 어떻게 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [mode, setMode] = useState('chat'); // 'chat' or 'news'

  const kakaoId = localStorage.getItem('kakaoId'); // 카카오 아이디 가져오기

  const handleSend = async () => {
    if (mode === 'chat' && input.trim() === '') return;
    if (mode === 'news' && newsUrl.trim() === '') return;

    if (mode === 'chat') {
      // Add user message to chat
      setMessages([...messages, { sender: 'User', text: input }]);
    } else {
      // Add user message to chat with news URL
      setMessages([...messages, { sender: 'User', text: newsUrl }]);
    }

    try {
      // Send user input, newsUrl, and kakaoId to backend
      const response = await axios.post('http://52.78.53.98:8000/api/chatbot/', {
        input,
        newsUrl,
        kakaoId,
      });

      if (mode === 'news') {
        // Add bot response with news summary and related articles
        setMessages([
          ...messages,
          { sender: 'User', text: newsUrl },
          { sender: 'Bot', text: `뉴스 요약: ${response.data.newsSummary}` },
          ...response.data.relatedArticles.map((article, index) => ({
            sender: 'Bot',
            text: `관련 기사 ${index + 1}: ${article}`,
          })),
        ]);
      } else {
        // Add bot response to chat
        setMessages([
          ...messages,
          { sender: 'User', text: input },
          { sender: 'Bot', text: response.data.answer },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...messages,
        { sender: 'User', text: input || newsUrl },
        { sender: 'Bot', text: 'Sorry, something went wrong.' },
      ]);
    }

    // Clear input fields
    setInput('');
    setNewsUrl('');
  };

  return (
    <Container>
      <Header>Stock Chatbot</Header>
      <ModeSelector>
        <ModeButton active={mode === 'chat'} onClick={() => setMode('chat')}>
          Chat Mode
        </ModeButton>
        <ModeButton active={mode === 'news'} onClick={() => setMode('news')}>
          News Mode
        </ModeButton>
      </ModeSelector>
      <ChatContainer>
        <Messages>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender}>
              {msg.text}
            </Message>
          ))}
        </Messages>
        <InputContainer>
          {mode === 'chat' ? (
            <Input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <Input
              type="text"
              placeholder="Enter news URL..."
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
            />
          )}
          <Button onClick={handleSend}>Send</Button>
        </InputContainer>
      </ChatContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #343a40;
`;

const ModeSelector = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ModeButton = styled.button`
  padding: 10px 20px;
  background: ${(props) => (props.active ? '#007bff' : '#dee2e6')};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: ${(props) => (props.active ? '#0056b3' : '#ced4da')};
  }
`;

const ChatContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 100%;
  max-width: 600px;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
`;

const Message = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  align-self: ${(props) => (props.sender === 'Bot' ? 'flex-start' : 'flex-end')};
  background-color: ${(props) => (props.sender === 'Bot' ? '#e9ecef' : '#007bff')};
  color: ${(props) => (props.sender === 'Bot' ? '#000' : '#fff')};
  border-radius: 15px;
  max-width: 70%;
`;

const InputContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  margin-right: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

export default ChatbotPage;
