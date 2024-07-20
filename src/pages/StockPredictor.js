import React, { useState } from 'react';

function StockPredictor() {
  const [ticker, setTicker] = useState('');
  const [price, setPrice] = useState(null);
  const [predictPrice, setPredictPrice] = useState(null);
  const [articles, setArticles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch(`http://52.78.53.98:8000/predict/?ticker=${ticker}`);
    // const data = await response.json();
    // setPrice(data.price);
    // setPredictPrice(data.prediction);
    // setArticles(data.articles);
    setPrice(16000); // 나중에는 yfinance를 통해 서버에서 가져올 예정
    setPredictPrice(14000); // 나중에는 예측한 주가를 가져올 예정

    // 임시 기사 데이터 설정
    setArticles([
      { title: 'Company A achieves record sales', expection: -0.022376789, link: 'https://example.com/article1' },
      { title: 'Company B faces regulatory challenges', expection: 0.02324515, link: 'https://example.com/article2' },
      { title: 'Company C announces new product line', expection: 0.01231235, link: 'https://example.com/article3' },
    ]);
  };

  return (
    <div style={styles.container}>
      <h1>Stock Price Predictor</h1>
      <div style={styles.formAndResult}>
        <form onSubmit={handleSubmit} style={styles.predictorForm}>
          <label>
            Company:
            <select value={ticker} onChange={(e) => setTicker(e.target.value)} required style={styles.select}>
              <option value="">Select a company</option>
              <option value="042660.KS">한화오션</option>
              <option value="010130.KS">고려아연</option>
              <option value="001570.KS">금양</option>
              <option value="001450.KS">현대해상</option>
            </select>
          </label>
          <button type="submit" style={styles.button}>Predict</button>
        </form>
        {price && (
          <div style={styles.result}>
            <h2>예측 가격: {predictPrice}</h2>
            <h2>가격: {price}</h2>
            <h2>상승폭: {((predictPrice / price - 1) * 100).toFixed(3)}%</h2>
          </div>
        )}
      </div>
      {articles.length > 0 && (
        <div style={styles.articles}>
          <h3>관련 기사</h3>
          {articles.map((article, index) => (
            <div key={index} style={styles.article}>
              <div>
                <h4>{article.title}</h4>
                <a href={article.link} target="_blank" rel="noopener noreferrer">{article.link}</a>
              </div>
              <p style={styles.expection}>{(article.expection * 100).toFixed(3)}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    margin: '20px',
  },
  formAndResult: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
  },
  predictorForm: {
    textAlign: 'left',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    marginLeft: '10px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    marginLeft: '20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  result: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '20px',
    textAlign: 'left',
    marginLeft: '20px',
    minWidth: '200px',
  },
  articles: {
    marginTop: '20px',
    textAlign: 'left',
  },
  article: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  expection: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default StockPredictor;
