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
        <Route path="/" element={<Home />} /> {/* 기본 홈 경로 */}
        
        {/* 제품 상세 페이지 라우트 */}
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* 비교 페이지 라우트 */}
        <Route path="/compare/:id1/:id2?" element={<Compare />} />
        <Route path="/:tabId" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;