// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Compare from './pages/Compare';

function App() {
  return (
    <Router>
      <Routes>
        {/*
          ✨ 중요! ✨
          더 구체적인 경로(product, compare)는 위에 두고,
          덜 구체적인 경로인 /:tabId를 아래에 두어야 합니다.

          - path="/" : 루트 경로 (Home 컴포넌트의 "홈" 탭에 해당)
          - path="/:tabId" : 뉴스, 스마트폰 등 다른 탭 경로 (예: /#/news, /#/smartphones)
            -> 이 :tabId 값이 Home 컴포넌트의 useParams()에서 읽힙니다.
        */}
        <Route path="/" element={<Home />} /> {/* 기본 홈 경로 */}
        
        {/* 제품 상세 페이지 라우트 */}
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* 비교 페이지 라우트 */}
        <Route path="/compare/:id1/:id2?" element={<Compare />} />

        {/*
          ✨ 뉴스, 스마트폰 등 모든 탭 경로를 Home 컴포넌트가 받도록 추가 ✨
          이 라우트가 있어야 /#/news, /#/smartphones 와 같은 URL에서
          Home 컴포넌트가 렌더링되고, Home.jsx의 useParams().tabId가 값을 가져올 수 있습니다.
        */}
        <Route path="/:tabId" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;