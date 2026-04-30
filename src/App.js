import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Compare from './pages/Compare';
import NewsDetail from './pages/NewsDetail';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Layout으로 전체 감싸기 */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/compare/:id1/:id2?" element={<Compare />} />
          <Route path="/:tabId" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;