import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StockPredictor from './StockPredictor';
import MainPage from './MainPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/predict">Stock Predictor</Link>
            </li>
            <li>
              <Link to="/mainpage">Hello World</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/predict" element={<StockPredictor />} />
          <Route path="/mainPage" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;