// NewsPage.js
import React from 'react';
import NewsComponent from '../components/NewsComponent';

const NewsPage = () => {
  return (
    <div>
      <h1>News Page</h1>
      <NewsComponent kakaoId={"admin"} />
    </div>
  );
};

export default NewsPage;