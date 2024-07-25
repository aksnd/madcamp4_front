import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: 'Bot', text: '안녕하세요! 어떻게 도와드릴까요?' },
  ]);
  const [input, setInput] = useState('');
  const [newsUrl, setNewsUrl] = useState('');
  const [mode, setMode] = useState('chat'); // 'chat' or 'news'
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const kakaoId = localStorage.getItem('kakaoId'); // 카카오 아이디 가져오기

  const messageEndRef = useRef(null);

  const handleSend = async () => {
    if (mode === 'chat' && input.trim() === '') return;
    if (mode === 'news' && newsUrl.trim() === '') return;

    const userMessage = mode === 'chat' ? { sender: 'User', text: input } : { sender: 'User', text: newsUrl };
    setMessages([...messages, userMessage]);
    setLoading(true); // 로딩 상태 설정

    try {
      const response = await axios.post('http://52.78.53.98:8000/api/chatbot/', {
        input,
        newsUrl,
        kakaoId,
      });

      const botMessages = mode === 'news'
        ? [
            { sender: 'Bot', text: `뉴스 요약: ${response.data.newsSummary}` },
            ...response.data.relatedArticles.map((article, index) => ({
              sender: 'Bot',
              text: `관련 기사 ${index + 1}: <a href="${article}" target="_blank" rel="noopener noreferrer">${article}</a>`,
            })),
          ]
        : [{ sender: 'Bot', text: response.data.answer }];

      setMessages([...messages, userMessage, ...botMessages]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...messages,
        userMessage,
        { sender: 'Bot', text: 'Sorry, something went wrong.' },
      ]);
    }

    // Clear input fields and reset loading state
    setInput('');
    setNewsUrl('');
    setLoading(false);
  };

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            </Message>
          ))}
          <div ref={messageEndRef} />
        </Messages>
        <InputContainer>
          {mode === 'chat' ? (
            <Input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading} // 로딩 중일 때 비활성화
            />
          ) : (
            <Input
              type="text"
              placeholder="Enter news URL..."
              value={newsUrl}
              onChange={(e) => setNewsUrl(e.target.value)}
              disabled={loading} // 로딩 중일 때 비활성화
            />
          )}
          <Button onClick={handleSend} disabled={loading}> {/* 로딩 중일 때 버튼 비활성화 */}
            {loading ? <Spinner /> : 'Send'} {/* 로딩 중일 때 스피너 표시 */}
          </Button>
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
  height: 700px;
  width: 100%;
  max-width: 600px;
  position: relative;
  overflow: hidden;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 80px;
`;

const Message = styled.div`
  padding: 10px;
  border-radius: 15px;
  max-width: 60%;
  align-self: ${(props) => (props.sender === 'Bot' ? 'flex-start' : 'flex-end')};
  background-color: ${(props) => (props.sender === 'Bot' ? '#e9ecef' : '#007bff')};
  color: ${(props) => (props.sender === 'Bot' ? '#000' : '#fff')};
  word-break: break-word;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  background: #fff;
  position: absolute;
  bottom: 0;
  width: calc(100% - 40px);
  border-top: 1px solid #dee2e6;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ced4da;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default ChatbotPage;
