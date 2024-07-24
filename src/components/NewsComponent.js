import React, { useEffect, useState } from 'react';
import './NewsComponent.css'; // 스타일시트 파일 추가

const NewsComponent = ({ kakaoId }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedUsers, setRelatedUsers] = useState([]);

  useEffect(() => {
    // 맞춤 뉴스 URL을 가져오는 API 호출
    fetch(`http://52.78.53.98:8000/api/relevant-news/?kakao_id=${kakaoId}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.urls && data.summary) {
          setNews(data);
        } else {
          setError('Invalid data format received');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching personalized news:', error);
        setError('Error fetching personalized news');
        setLoading(false);
      });
  }, [kakaoId]);

  const handleCardClick = (summary) => {
    fetch(`http://52.78.53.98:8000/api/relevant-users/?query=${encodeURIComponent(summary)}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.users) {
          setRelatedUsers(data.users);
        } else {
          setRelatedUsers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching related users:', error);
        setRelatedUsers([]);
      });
  };

  if (loading) {
    return <div className="loading">Loading...</div>; // 로딩 화면
  }

  if (error) {
    return <div className="error">{error}</div>; // 에러 메시지 표시
  }

  return (
    <div className="news-container">
      <h4 className="description">유저의 채팅 이력을 통해 뉴스를 추천드립니다.</h4>
      <div className="news-cards">
        {news.urls.map((url, index) => (
          <div key={index} className="news-card" onClick={() => handleCardClick(news.summary[index])}>
            <div className="news-summary">{news.summary[index]}</div>
            <div className="news-actions">
              <span className="icon">👍</span>
              <span className="icon">👎</span>
            </div>
            <a href={url} target="_blank" rel="noopener noreferrer" className="news-link">Read Article</a>
          </div>
        ))}
      </div>
      {relatedUsers.length > 0 && (
        <div className="related-users">
          <h4>이 기사를 관심 있어하는 유저들:</h4>
          <div className="users-grid">
            {relatedUsers.map((user, index) => (
              <div key={index} className="user-card">
                <div className="user-avatar">{user.charAt(0).toUpperCase()}</div>
                <div className="user-id">{user}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
