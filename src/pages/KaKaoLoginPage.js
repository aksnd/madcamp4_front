// src/KaKaoLoginPage.js

import React from 'react';
import styled from '@emotion/styled';
import background from '../components/main_background.jpg';
import kakaoLoginButton from '../components/kakao_login.png';


const AppContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-color: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  background-blend-mode: darken;
`;

const Overlay = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* 흰색 오버레이 */
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  height: 80%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const TextContainer = styled.div`
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 20px 0;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 10px;
`;

const FeatureText = styled.p`
  font-size: 2rem; /* 글자 크기 조정 */
`;

const KakaoButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const KakaoButton = styled.img`
  width: 400px; /* 원하는 크기로 조정 */
  height: auto;
  cursor: pointer;
`;

const KakaoLogin = () => {
    const kakaoLogin = () => {
        window.location.href = 'http://52.78.53.98:8000/kakao/login/';
    };

    return (
        <AppContainer>
            <Overlay>
                <TextContainer>
                    <h1>Stock Insights에 오신 것을 환영합니다</h1>
                    <p>"주식 시장은 모든 것의 가격을 알지만, 아무것도 알지 못하는 사람들로 가득 차 있다." – 필립 피셔</p>
                    <p>"투자에서 편안함은 드물게 수익성을 동반한다." – 로버트 아노트</p>
                </TextContainer>
                <FeaturesContainer>
                    <FeatureItem>
                        <FeatureIcon>🤖</FeatureIcon>
                        <FeatureText>주식 챗봇</FeatureText>
                    </FeatureItem>
                    <FeatureItem>
                        <FeatureIcon>📰</FeatureIcon>
                        <FeatureText>기사 분석</FeatureText>
                    </FeatureItem>
                    <FeatureItem>
                        <FeatureIcon>📈</FeatureIcon>
                        <FeatureText>주가 예측</FeatureText>
                    </FeatureItem>
                </FeaturesContainer>
                <KakaoButtonContainer>
                    <KakaoButton src={kakaoLoginButton} alt="카카오 로그인" onClick={kakaoLogin} />
                </KakaoButtonContainer>
            </Overlay>
        </AppContainer>
    );
};

export default KakaoLogin;
