import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import MainPage from './pages/MainPage';
import EmotionPage from './pages/EmotionPage';
import ChatbotPage from './pages/ChatbotPage';
import DrawerMenu from './components/DrawerMenu';
import KakaoLogin from './pages/KaKaoLoginPage';
import LoginSuccessPage from './pages/LoginSuccessPage';
import LogOutPage from './pages/LogOutPage';
import NewsPage from './pages/NewsPage';
import CompanyClickPage from './pages/CompanyClickPage';
import CompanySearchPage from './pages/CompanySearchPage';


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
                      <Route path="/logout" element={<LogOutPage setKakaoId={setKakaoId} />} />
                      <Route path="/news" element={<NewsPage />} />
                      <Route path="/companyclick" element={<CompanyClickPage />} />
                      <Route path="/companysearch" element={<CompanySearchPage />} />
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