import React, { useState } from 'react';
import '../App.css'; // CSS 파일 import

function StockPredictor() {
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchSubmitted(true);
    const response = await fetch(`http://52.78.53.98:8000/emotion/?company=${company}`);
    const data = await response.json();
    setPrice(10); // 임시로 10점 표시
    setArticles(data.articles);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={searchSubmitted ? styles.searchFormSubmitted : styles.searchForm}>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="회사명을 입력하세요"
          style={styles.searchInput}
          required
        />
        <button type="submit" style={styles.searchButton}>검색</button>
      </form>
      {loading ? (
        <div style={styles.loading}>
          <div className="loader"></div>
        </div>
      ) : searchSubmitted && (
        <>
          <div style={styles.result}>
            <h2>{company}의 오늘 점수: {price}</h2>
          </div>
          <div style={styles.articles}>
            <h3>관련 기사</h3>
            {articles.map((article, index) => (
              <div key={index} style={styles.article}>
                <div>
                  <h4>{article.title}</h4>
                  <a href={article.link} target="_blank" rel="noopener noreferrer">{article.link}</a>
                </div>
                <p style={styles.expection}>{article.emotion}</p>
              </div>
            ))}
          </div>
        </>
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
  searchForm: {
    margin: '0 auto',
    marginTop: '200px', // 중앙에 위치하도록 설정
    transition: 'margin-top 0.5s ease',
  },
  searchFormSubmitted: {
    margin: '0 auto',
    marginTop: '20px', // 최상단으로 이동
    transition: 'margin-top 0.5s ease',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    marginRight: '10px',
  },
  searchButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    marginTop: '20px',
  },
  result: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    padding: '20px',
    textAlign: 'center',
    marginTop: '20px',
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
