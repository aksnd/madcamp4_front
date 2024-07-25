import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  
function CompanyClickPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const company = params.get('company');

    const [price, setPrice] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchSubmitted, setSearchSubmitted] = useState(false);
    const [historicalData, setHistoricalData] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [hoverIndex, setHoverIndex] = useState(null);

    
    const handleCompanyClick = async () => {
        setLoading(true);
        const response = await fetch(`http://52.78.53.98:8000/predict/?company=${company}`);
        const data = await response.json();
        setPrice(data.price);
        setHistoricalData(data.historical_data);
        setArticles(data.articles);
        setLoading(false);
        setSubmit(true);
    };

    const chartData = {
    labels: historicalData.map(entry => {
        const date = new Date(entry.Date);
        const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
        const day = date.getDate();
        return `${month}/${day}`;
    }),
    datasets: [ 
        {
            label: `${company} Historical Price`,
            data: historicalData.map(entry => entry.Close),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }
    ]
    };
    const chartOptions = {
    maintainAspectRatio: false,
    scales: {
        y: {
        beginAtZero: false,
        min: Math.min(...historicalData.map(entry => entry.Close)) * 0.9, // y축 최소값을 데이터의 최솟값보다 10% 낮게 설정
        ticks: {
            padding: 10, // y축의 숫자와 그래프 사이의 간격 추가
        },
        },
    },
    };
    

    const calculateEmotionAverage = () => {
        if (articles.length === 0) return 0;
        const totalEmotion = articles.reduce((sum, article) => sum + article.emotion, 0);
        return totalEmotion / articles.length;
    };
    const calculatefuture =() =>{
        return (calculateEmotionAverage()*0.001827563342034779-0.014634778434037208)*100;
      }

    const handleMouseEnter = (index) => {
    setHoverIndex(index);
    };

    const handleMouseLeave = () => {
    setHoverIndex(null);
    };

    const handleClick = (link) => {
    window.open(link, "_blank", "noopener noreferrer");
    };

    const getEmotionColor = (emotion) => {
    if (emotion > 6) {
        return "#f44336"; // 긍정적인 감정 (빨강)
    } else if (emotion < 4) {
        return "#2196f3"; // 부정적인 감정 (파랑)
    } else {
        return "#9e9e9e"; // 중립적인 감정 (회색)
    }
    };
    
    useEffect(() => {
      handleCompanyClick();
    },[]);

    return (

    <div style={styles.container}>
        {loading ? (
            <div><CircularProgress /></div>
          ) : (
            <>
              <div style={styles.result_container}>
                {price? (<div style={styles.result}>
                 <h2>{company}의 오늘 가격: {price}</h2>
                 <div style={styles.chartContainer}>
                  <Line data={chartData} options={chartOptions} />
                 </div>
                </div>):null}
                <div style={styles.articles}>
                  <h2 style={{color: getEmotionColor(calculateEmotionAverage().toFixed(2))}}>평균 감정 점수: {calculateEmotionAverage().toFixed(2)}</h2>
                  <h2>내일 주가 예측: {`${calculatefuture().toFixed(2)}% 변동`}</h2>
                  {articles.map((article, index) => (
                    <div key={index} style={styles.article}>
                      
                      <div
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(article.link)}
                      >
                        <h4 style={{
                          ...styles.summary,
                          ...(hoverIndex === index ? styles.summaryHover : {}),
                        }}
                        >{article.summary}</h4>
                        <p style={{...styles.expection, color: getEmotionColor(article.emotion)}}>기사 점수 평가:{article.emotion}점 으로 분석했어요!</p>
                      </div>
                    </div>
                  ))}
                </div>
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
    result_container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      height: '80vh',
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
export default CompanyClickPage;
