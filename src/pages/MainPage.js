import React from 'react';
import styled from 'styled-components';

const MainPage = () => {
  return (
    <Container>
      <Header>Today's Market Insights</Header>
      <MainContent>
        <Featured>
          <FeaturedTitle>Featured Article</FeaturedTitle>
          <FeaturedArticle>
            <Thumbnail src="https://via.placeholder.com/400x200" alt="Featured Article Thumbnail" />
            <ArticleDetails>
              <Title>Breaking News: Market Hits All-Time High</Title>
              <Description>
                The stock market reached an unprecedented high today, with major indices posting significant gains...
              </Description>
            </ArticleDetails>
          </FeaturedArticle>
        </Featured>
        <Sidebar>
          <SidebarTitle>Latest Updates</SidebarTitle>
          <UpdateList>
            <UpdateItem>Update 1: Company XYZ announces quarterly earnings...</UpdateItem>
            <UpdateItem>Update 2: Tech stocks rally as new products unveiled...</UpdateItem>
            <UpdateItem>Update 3: Market reacts to latest economic data...</UpdateItem>
          </UpdateList>
        </Sidebar>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
  color: #3e4a61;
`;

const MainContent = styled.div`
  display: flex;
  gap: 20px;
`;

const Featured = styled.div`
  flex: 2;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FeaturedTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #3e4a61;
`;

const FeaturedArticle = styled.div`
  display: flex;
  gap: 20px;
`;

const Thumbnail = styled.img`
  width: 400px;
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
`;

const ArticleDetails = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #3e4a61;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #555;
`;

const Sidebar = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SidebarTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #3e4a61;
`;

const UpdateList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UpdateItem = styled.li`
  font-size: 1rem;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export default MainPage;