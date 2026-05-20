import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import * as S from './Layout.styles';
import SideAds from './SideAds';

function Layout() {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <SideAds />
      {/* 🔝 헤더 */}
      <S.Header onClick={() => navigate('/')}>
        <S.Logo>스마트하게 비교하고 사자! 스펙마루</S.Logo>
      </S.Header>

      {/* 📄 페이지 내용 */}
      <S.Main>
        <Outlet />
      </S.Main>

      {/* 🔻 푸터 */}
      <S.Footer>
        <p style={{ color: 'gray', fontSize: '10px' }}>
          "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."
        </p>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSchAA0vaJQtxPO1KyGBkQqEJx4S3yAHAok1-FW0Jv33eqUYQw/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0073e6', textDecoration: 'none' }}
        >
          💬 의견 보내기
        </a>
      </S.Footer>
    </S.Wrapper>
  );
}

export default Layout;