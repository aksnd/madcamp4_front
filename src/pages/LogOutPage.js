// src/LoginSuccessPage.js
import React from 'react';
import { useNavigate} from 'react-router-dom';

const LogOutPage = ({ setKakaoId }) => {
    const navigate = useNavigate();
    localStorage.removeItem('kakaoId');
    setKakaoId(null);

    const logoutRedirectUri = `http://52.78.53.98:8000/kakao/logout/`;
    const logoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=82c56c5c2137fe9743b658368f339567&logout_redirect_uri=${logoutRedirectUri}`;
    window.location.href = logoutUrl;
    //navigate('/kakao');


    return <div>LogOutPage</div>;
};

export default LogOutPage;