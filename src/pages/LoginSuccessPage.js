// src/LoginSuccessPage.js
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginSuccessPage = ({ setKakaoId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const kakaoId = params.get('kakao_id');

    if (kakaoId) {
      localStorage.setItem('kakaoId', kakaoId);
      setKakaoId(kakaoId);
      navigate('/');
    } else {
      navigate('/kakao');
    }
  }, [location, navigate, setKakaoId]);

  return <div>Login successful, redirecting...</div>;
};

export default LoginSuccessPage;