import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // CSS 파일 import
import CircularProgress from '@mui/material/CircularProgress';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function EmotionPage() {
  const [company, setCompany] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const navigate = useNavigate();
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
    navigate(`/companyclick?company=${company}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/companysearch?company=${company}`);
  };

  return (
    <div style={styles.container}>
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
    </div>
  );
}


const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    margin: '20px',
  },
  result_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '80vh',
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
  selectButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '10px 20px',
    backgroundColor: '#00AFFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  result: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    height: '100%', // 부모 요소의 전체 높이를 사용합니다.
    padding: '0px',
    textAlign: 'center',
    marginTop: '20px',
    marginRight: '20px',
    flexDirection: 'column',
    display: 'flex',
  },
  chartContainer: {
    flex: 1,
    height: '80vh', // 차트 컨테이너의 높이를 80% 뷰포트 높이로 설정합니다.
  },
  articles: {
    flex: 1,
    marginTop: '20px',
    marginLeft: '20px',
    textAlign: 'center',
    overflowY: "auto", // 세로 스크롤바 활성화
    maxHeight: "80vh", // 스크롤이 적용될 최대 높이
  },
  article: {
    display: 'flex',
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",

  },
  summary: {
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    transition: "color 0.3s ease",
  },
  summaryHover: {
    color: "#888", // 요약 텍스트에 커서를 올렸을 때 연해지는 색상
  },
  expection: {
    fontWeight: "bold",
    fontSize: "20px",
    marginTop: "10px",
  },
};

export default EmotionPage;
