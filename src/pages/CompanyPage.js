import React from 'react';
import styled from 'styled-components';

const CompanyPage = () => {
  return (
    <Container>
      <Header>Company Information</Header>
      <CompanyInfo>
        <Thumbnail src="https://via.placeholder.com/150" alt="Article Thumbnail" />
        <Details>
          <Title>Article Title</Title>
          <Description>Article description goes here.</Description>
        </Details>
      </CompanyInfo>
      <StockInfo>
        <StockPrice>Current Stock Price: $100</StockPrice>
        <StockChange>Today's Change: +1.5%</StockChange>
      </StockInfo>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 20px;
`;

const Details = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
`;

const StockInfo = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StockPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StockChange = styled.p`
  font-size: 1rem;
  color: ${props => (props.change > 0 ? 'green' : 'red')};
`;

export default CompanyPage;