// NewsComponent.js
import React, { useEffect, useState } from 'react';

const NewsComponent = ({ kakaoId }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // 맞춤 뉴스 URL을 가져오는 API 호출
    fetch(`http://52.78.53.98:8000/api/relevant-news/?kakao_id=${kakaoId}`)
      .then(response => response.json())
      .then(data => setNews(data.urls))
      .catch(error => console.error('Error fetching personalized news:', error));
  }, [kakaoId]);

  return (
    <div>
      <h2>Personalized News</h2>
      <ul>
        {news.map((url, index) => (
          <li key={index}>
            <a href={url} target="_blank" rel="noopener noreferrer">Read Article {index + 1}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;