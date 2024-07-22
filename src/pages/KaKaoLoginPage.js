// src/KaKaoLoginPage.js

import React from 'react';

const KakaoLogin = () => {
    const kakaoLogin = () => {
        window.location.href = 'http://52.78.53.98:8000/kakao/login/';
    };

    return (
        <div>
            <h1>Login with Kakao</h1>
            <button onClick={kakaoLogin}>Login with Kakao</button>
        </div>
    );
};

export default KakaoLogin;