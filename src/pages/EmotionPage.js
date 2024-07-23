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
    { name: '삼성전자', icon: '📱' },
    { name: 'SK하이닉스', icon: '🔌' }, 
    { name: 'LG에너지솔루션', icon: '🔋' },
    { name: '삼성바이오로직스', icon: '🧬' },
    { name: '현대차', icon: '🚗' },
    { name: '기아', icon: '🚙' },
    { name: '셀트리온', icon: '💊' },
    { name: 'KB금융', icon: '💳' },
    { name: 'POSCO홀딩스', icon: '🏭' },
    { name: 'NAVER', icon: '🌐' },
    { name: '삼성생명', icon: '💼' }, 
    { name: 'LG전자', icon: '📺' },   
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
          <h1>원하는 회사를 선택하거나, 직접 입력해주세요</h1>
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
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)', // 4 열
    gap: '16px', // 아이템 간 간격
    padding: '16px',
    justifyContent: 'center', // 가로 정렬
    alignItems: 'center', // 세로 정렬
    margin: '0 auto', // 가운데 정렬
    maxWidth: '800px' // 그리드 최대 너비
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
    marginTop: '20px', // 중앙에 위치하도록 설정
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
