import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import MainPage from './pages/MainPage';
import EmotionPage from './pages/EmotionPage';
import ChatbotPage from './pages/ChatbotPage';
import StockPredictor from './pages/StockPredictor';
import DrawerMenu from './components/DrawerMenu';
import KakaoLogin from './pages/KaKaoLoginPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import NewsPage from './pages/NewsPage';

function App() {
  const [kakaoId, setKakaoId] = useState(null);

  useEffect(() => {
    const storedKakaoId = localStorage.getItem('kakaoId');
    if (storedKakaoId) {
      setKakaoId(storedKakaoId);
    }
  }, []);

  return (
      <Router>
          <GlobalStyle />
          <DrawerMenu />
          <Routes>
              {kakaoId ? (
                  <>
                      <Route path="/" element={<MainPage />} />
                      <Route path="/emotion" element={<EmotionPage />} />
                      <Route path="/chatbot" element={<ChatbotPage />} />
                      <Route path="/predictor" element={<StockPredictor />} />
                      <Route path="/news" element={<NewsPage />} />
                  </>
              ) : (
                  <Route path="*" element={<KakaoLogin />} />
              )}
              <Route path="/login-success" element={<LoginSuccessPage setKakaoId={setKakaoId} />} />
          </Routes>
      </Router>
  );
}

export default App;