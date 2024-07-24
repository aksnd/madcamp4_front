import React from 'react';
import NewsComponent from '../components/NewsComponent';
import '../components/NewsComponent.css'; // 스타일시트 파일 추가

const NewsPage = () => {
  return (
    <div className="page-container">
      <h1 className="title">맞춤 뉴스</h1>
      <NewsComponent kakaoId={"admin"} />
    </div>
  );
};

export default NewsPage;
