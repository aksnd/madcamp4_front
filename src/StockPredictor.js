import React, { useState } from 'react';

function StockPredictor() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://52.78.53.98:8000/predict/?ticker=${ticker}`);
    const data = await response.json();
    setPrice(data.prediction);
  };

  return (
    <div>
      <h1>Stock Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Company:
          <select value={ticker} onChange={(e) => setTicker(e.target.value)} required>
            <option value="">Select a company</option>
            <option value="005930.KS">Samsung Electronics</option>
            <option value="000660.KS">SK Hynix</option>
            <option value="005380.KS">Hyundai Motor</option>
          </select>
        </label>
        <button type="submit">Predict</button>
      </form>
      {price && (
        <div>
          <h2>Price: {price}</h2>
        </div>
      )}
    </div>
  );
}

export default StockPredictor;