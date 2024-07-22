import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

function MainPage() {
  const [interest, setInterest] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://52.78.53.98:8000/api/recommend/', { interest });
      setRecommendation(response.data.answer);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>안녕하세요! 관심분야를 입력해주세요!</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="관심 분야를 입력하세요"
        />
        <Button type="submit">추천받기</Button>
      </Form>
      {loading && <LoaderContainer><CircularProgress /></LoaderContainer>}
      {!loading && recommendation && (
        <ResultContainer>
          <RecommendationTitle>당신에게 추천드리는 회사는 {recommendation}입니다!</RecommendationTitle>
          <Articles>
            <Article>관련 기사 1</Article>
            <Article>관련 기사 2</Article>
            <Article>관련 기사 3</Article>
          </Articles>
        </ResultContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 2rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border-radius: 25px;
  border: 1px solid #ccc;
  width: 300px;
  margin-bottom: 20px;
  text-align: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 25px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoaderContainer = styled.div`
  margin-top: 20px;
`;

const ResultContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const RecommendationTitle = styled.h2`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 20px;
`;

const Articles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Article = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  width: 300px;
  text-align: center;
  background-color: #f9f9f9;
`;


export default MainPage;