import React, { useState } from 'react';

function StockPredictor() {
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState(null);
  const [articles, setArticles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://52.78.53.98:8000/predict/?company=${company}`);
    const data = await response.json();
    setPrice(data.price);
    setArticles(data.articles);
  };

  return (
    <div style={styles.container}>
      <h1>Stock Price Predictor</h1>
      <div style={styles.formAndResult}>
        <form onSubmit={handleSubmit} style={styles.predictorForm}>
          <label>
            Company:
            <select value={company} onChange={(e) => setCompany(e.target.value)} required style={styles.select}>
              <option value="">Select a company</option>
              <option value="삼성전자">삼성전자</option>
              <option value="한화오션">한화오션</option>
              <option value="고려아연">고려아연</option>
              <option value="금양">금양</option>
              <option value="현대해상">현대해상</option>
            </select>
          </label>
          <button type="submit" style={styles.button}>Predict</button>
        </form>
        {price && (
          <div style={styles.result}>
            <h2>가격: {price}</h2>
          </div>
        )}
      </div>
      {articles.length > 0 && (
        <div style={styles.articles}>
          <h3>관련 기사</h3>
          {articles.map((article, index) => (
            <div key={index} style={styles.article}>
              <div style={styles.articleContent}>
                <h4>{article.title}</h4>
                <a href={article.link} target="_blank" rel="noopener noreferrer">{article.link}</a>
              </div>
              <div style={styles.expectionContainer}>
                <p style={styles.expection}>감정분석 결과: {article.emotion}</p>
                <p style={styles.expection}>연관성 분석 결과: {article.relevance}</p>
              </div>
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
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  articleContent: {
    flex: '1',
  },
  expectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  expection: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};

export default StockPredictor;
