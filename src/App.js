import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import MainPage from './pages/MainPage';
import CompanyPage from './pages/CompanyPage';
import ChatbotPage from './pages/ChatbotPage';
import StockPredictor from './pages/StockPredictor';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/predictor" element={<StockPredictor />} />
      </Routes>
    </Router>
  );
}

export default App;