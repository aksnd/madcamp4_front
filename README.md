# Preview

---

stocking은 stock+ing으로 주식에 진행형 수식어를 붙인 주식관련 웹사이트 입니다. stock + talking이나 stock + king으로도 이해할 수 있는 등 중의적 의미를 담고 있습니다.

주식 data나 뉴스 기사 등의 외부 데이터 소스를 바탕으로, langchain을 이용해 주식 기사 분석, 챗봇, 관련기사나 맞춤 뉴스 추천 기능을 제공 합니다. 더욱이 이렇게 얻은 정보를 바탕으로 향후 주가 예측 기능까지 구현하였습니다.

# 개발환경

---

Language: React(FE), Django(BE)

DB: ChromaDB, SQLite

Server: AWS EC2

# 기능소개

---

### 로그인 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/f34e4f50-38f4-4cb0-833e-49c6422cdd7a/Untitled.png)

로그인 되지 않은 상태에 접속하면 들어가지는 화면

카카오 로그인으로 로그인

### DrawerMenu

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/a3770e5e-8c6d-4f05-97b3-842c71c423ae/Untitled.png)

DrawerMenu의 경우 각 페이지로의 이동을 담당하며, 각 페이지와 로그아웃 버튼이 존재함.

### 메인 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/90fe96cd-cef3-4848-bc71-7904c8192334/Untitled.png)

메인 페이지에는 관심사를 입력하면 회사를 추천 받을  수 있는 기능 존재

해당 기능을 통해 추천 받은 기업 페이지로 넘어갈 수 있음

### 회사 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/e46fc269-447b-4092-b2f0-de4256ec8d0e/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/125a960d-7aac-4238-8ea0-42b0a996a53c/Untitled.png)

기업을 직접 쳐서 검색하거나, 미리 정해둔 16개 기업 중 하나를 선택했을 때, 해당 기업에 대한 정보를 보여줌. 

해당 기업의 오늘 뉴스들의 요약과, 그 뉴스가 호재를 의미하는지, 악재를 의미하는지를 알려주고, 해당 뉴스를 클릭하면 해당 뉴스로 넘어갈 수 있고 해당 호재 와 악재 정보를 종합해 내일 주가도 예측함.

미리 정해둔 16개 기업의 경우, 해당 기업의 주가 차트도 같이 띄워둠.

### 챗봇 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/76a6fa7b-70ae-4986-a418-efe97d1d677b/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/4a81fb37-e5d1-4ddc-a7cc-ed7f59448e09/Untitled.png)

주식과 관련된 자유로운 질문을 할 수 있는 질문 모드, 뉴스 url을 입력해 뉴스 본문 요약과 관련 기사를 돌려 받을 수 있는 뉴스 모드가 존재한다.

langchain을 이용해 미리 db에 크롤링한 뉴스 기사를 기반으로 한 RAG를 구현하여 llm으로부터 각종 최신 뉴스들과 관련 깊은 대답을 들을 수 있다.

### 기사 추천 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/a5dddcf5-0338-4de0-b9b9-c27ff76ee833/Untitled.png)

챗봇 페이지에서 유저가 제공한 질문들과 뉴스 기사들을 유저 데이터베이스에 따로 임베딩하여 저장함으로써, 유저 맞춤형 기사들을 similarity search하고 제공할 수 있다.

이렇게 제공 받은 기사를 요약해서 카드 형식으로 유저에게 표시하고, 각 뉴스를 추천하게 되면 해당 요약문을 다시 유저 데이터베이스에 저장하여 향후 비슷한 뉴스를 추천할 수 있도록 구현하였다.

각 뉴스 카드를 클릭하면 하단에 해당 뉴스를 관심 있어 하는 다른 유저들도 확인할 수 있다.

# 주요 기능 설계

---

### yfinance

주식 차트의 경우, python의 yfinance를 이용해 특정 기업의 매일의 종가를 가져올 수 있었고, 해당 정보를 통해 주식 차트를 그리고, 예측 모델을 만들 수 있었다.

### openai api

임베딩 모델과 llm으로 각각 openai에서 제공하는 text-embedding-3-small과 chatgpt 3.5 turbo를 사용하였다.

### 크롤링

뉴스기사를 크롤링하기 위해 네이버 api를 이용해 기사 제목과 url, 작성 날짜를 얻었고, beautiful soup 라이브러리를 사용해 url로부터 뉴스 본문을 가져왔다.

기술적 한계로 본문은 네이버에서 제공하는 뉴스에 한해서 크롤링할 수 있었다.

### 데이터베이스

뉴스기사나 유저의 질문 텍스트 등 langchain에서 이용하기 위한 데이터들을 임베딩하여 벡터 데이터베이스인 Chroma에 저장하였다. 이로 인해 코사인 유사도 기반 similarity search를 하여 회사추천, 챗봇, 맞춤 뉴스 등 유저들에게 적절한 데이터를 제공할 수 있게 되었다.

kakao 로그인을 구현하고 유저들의 kakao id를  sqlite를 이용해 저장하였다.

### langchain

langchain을 이용해 chroma db, llm, 임베딩 모델을 연결함으로써 RAG 등 벡터 데이터 기반 다양한 기능들을 구현하였다.

### 주가 예측 모델

input으로 chatgpt 3.5 model의 llm 결과를 넣고, output으로 해당 기사를 검색한 검색 회사의 그날 주가와 그다음 날 주가를 비교하여 데이터화 하고, 이를 통해 주가를 예측하였다.

다만, Naver API의 한계(1주일 보다 오래된 기사 가져오기 어려움)와 llm 비용의 한계로 최근 1주일 정도, 20개 기업정도의 기사들만 가져올 수 있었고, 최근 1주일간 코스피가 어려웠던 관계로, 항상 떨어진다고 예측한다는 한계가 있었다.

# 역경, 배운점, 느낀점

---

박지훈

Naver API의 한계, LLM 비용의 한계등등 우리가 해결할 수 있는 방법이 없어 기획을 변경해야 하는 상황이 너무 많이 발생해서, 초기 기획과 결과물이 많이 달라진 건 아쉽지만, 많은 어려움을 겪어보면서 많은 것을 배울 수 있는 기회가 되었다. 

장세일

크롤링 관련으로 가장 아쉬움이 많이 남는다. 네이버 제공 뉴스에 한하여  api에 의지하지 않고 보다 본격적인 크롤링을 수행했다면 더 좋은 데이터베이스를 만들 수 있었을 것 같다. openai api를 처음 써보았는데, 생각이상으로 쓰기 좋았고 langchain을 활용해보고 싶다는 ㅅ
