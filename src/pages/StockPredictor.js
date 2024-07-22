import React, { useState } from 'react';

function StockPredictor() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [price, setPrice] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const companies = [
    { name: '한화오션', icon: '🌊' },
    { name: '고려아연', icon: '🔧' },
    { name: '금양', icon: '💰' },
    { name: '현대해상', icon: '🚢' },
  ];

  const handleCompanyClick = async (company) => {
    setSelectedCompany(company);
    setLoading(true);
    const response = await fetch(`http://52.78.53.98:8000/predict/?company=${company}`);
    const data = await response.json();
    setPrice(data.price);
    setArticles(data.articles);
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      {!selectedCompany || loading ? (
        <>
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
            <div style={styles.loading}>
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <div style={styles.result}>
                <h2>{selectedCompany}의 오늘 점수: {price}</h2>
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
