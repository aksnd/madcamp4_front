import React, { useEffect, useState } from 'react';
import './NewsComponent.css'; // 스타일시트 파일 추가

const NewsComponent = ({ kakaoId }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedUsers, setRelatedUsers] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState(''); // 추가된 상태
  const [showFeedback, setShowFeedback] = useState(false); // 추가된 상태

  useEffect(() => {
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
          // 중복된 유저를 제거하기 위해 Set을 사용합니다.
          const uniqueUsers = Array.from(new Set(data.users));
          setRelatedUsers(uniqueUsers);
        } else {
          setRelatedUsers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching related users:', error);
        setRelatedUsers([]);
      });
  };

  const handleRecommendClick = (summary) => {
    fetch('http://52.78.53.98:8000/api/save-user-summary/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ summary, kakaoId }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showFeedbackMessage('추천하였습니다'); // 추천 메시지 표시
        } else {
          console.error('Failed to save summary');
        }
      })
      .catch(error => {
        console.error('Error saving summary:', error);
      });
  };

  const handleDislikeClick = () => {
    showFeedbackMessage('비추천하였습니다'); // 비추천 메시지 표시
  };

  const showFeedbackMessage = (message) => {
    setFeedbackMessage(message);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000); // 2초 후에 메시지 숨김
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="news-container">
      <h4 className="description">유저의 채팅 이력을 통해 뉴스를 추천드립니다.</h4>
      <div className="news-cards">
        {news.urls.map((url, index) => (
          <div key={index} className="news-card" onClick={() => handleCardClick(news.summary[index])}>
            <div className="news-summary">{news.summary[index]}</div>
            <div className="news-actions">
              <span className="icon" onClick={() => handleRecommendClick(news.summary[index])}>👍</span>
              <span className="icon" onClick={handleDislikeClick}>👎</span>
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
      {showFeedback && (
        <div className="feedback-popup">{feedbackMessage}</div>
      )}
    </div>
  );
};

export default NewsComponent;
