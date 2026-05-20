// src/index.js
import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HelmetProvider } from 'react-helmet-async'; // ✨ 1. HelmetProvider 임포트 추가! ✨

const rootElement = document.getElementById('root');

const app = (
  <React.StrictMode>
    <HelmetProvider> {/* ✨ 2. <App />을 <HelmetProvider>로 감싸주기! ✨ */}
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// react-snap이 미리 구워둔 HTML이 있으면 hydrate, 없으면 일반 렌더
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();