import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import MainPage from './pages/MainPage';
import EmotionPage from './pages/EmotionPage';
import ChatbotPage from './pages/ChatbotPage';
import StockPredictor from './pages/StockPredictor';
import DrawerMenu from './components/DrawerMenu';
import KakaoLogin from './pages/KaKaoLoginPage';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <DrawerMenu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/emotion" element={<EmotionPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/predictor" element={<StockPredictor />} />
        <Route path="/kakao" element={<KakaoLogin />} />
      </Routes>
    </Router>
  );
}

export default App;