import React, { useState } from 'react';
import '../App.css'; // CSS 파일 import
import CircularProgress from '@mui/material/CircularProgress';

function EmotionPage() {
  const [company, setCompany] = useState('');
  const [price, setPrice] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [submit, setSubmit] = useState(false);
  const companies = [
    { name: '한화오션', icon: '🌊' },
    { name: '고려아연', icon: '🔧' },
    { name: '금양', icon: '💰' },
    { name: '현대해상', icon: '🚢' },
  ];

  const handleCompanyClick = async (company) => {
    setCompany(company);
    setLoading(true);
    const response = await fetch(`http://52.78.53.98:8000/predict/?company=${company}`);
    const data = await response.json();
    setPrice(data.price);
    setArticles(data.articles);
    setLoading(false);
    setSubmit(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchSubmitted(true);
    const response = await fetch(`http://52.78.53.98:8000/emotion/?company=${company}`);
    const data = await response.json();
    setArticles(data.articles);
    setLoading(false);
    setSubmit(true);
  };

  const calculateEmotionAverage = () => {
    if (articles.length === 0) return 0;
    const totalEmotion = articles.reduce((sum, article) => sum + article.emotion, 0);
    return totalEmotion / articles.length;
  };

  const calculatefuture =() =>{
    return (calculateEmotionAverage()*0.001827563342034779-0.014634778434037208)*100;
  }
  
  return (
    <div style={styles.container}>
      {!submit && !loading ? (
        <>
          <form style={searchSubmitted ? styles.searchFormSubmitted : styles.searchForm}>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="회사명을 입력하세요"
              style={styles.searchInput}
              required
            />
            <button onClick={handleSubmit} style={styles.searchButton}>검색</button>
          </form>
          <h1>원하는 회사를 선택하세요</h1>
          <div style={styles.companyList}>
            {companies.map((company) => (
              <div
                key={company.name}
                style={styles.companyItem}
                onClick={() => handleCompanyClick(company.name)}
              >
                <div style={styles.companyIcon}>{company.icon}</div>
                <div style={styles.companyName}>{company.name}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {loading ? (
            <div><CircularProgress /></div>
          ) : (
            <>

              <div style={styles.result}>
                {price? (<h2>{company}의 오늘 가격: {price}</h2>):null}
                <h3>평균 감정 점수: {calculateEmotionAverage().toFixed(2)}</h3>
                <h3>내일 주가 예측: {`${calculatefuture().toFixed(2)}% 변동`}</h3>
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
  companyList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '40px',
    gap: '20px',
    marginTop: '40px', // 간격 추가
  },
  companyItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '40px',
    margin: '10px',
    cursor: 'pointer',
    width: '200px',
    height: '200px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  companyIcon: {
    fontSize: '50px',
    marginBottom: '10px',
  },
  companyName: {
    fontSize: '18px',
    fontWeight: 'bold',
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

export default EmotionPage;
