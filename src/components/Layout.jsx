import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as S from './Layout.styles';
import SideAds from './SideAds';

const DEFAULT_TITLE = '스펙마루 - 스마트폰, 노트북, 이어폰 스펙 비교';
const DEFAULT_DESC =
  '스펙마루에서 스마트폰, 노트북, 이어폰의 스펙·가격을 한눈에 비교하세요. 최신 모델 성능을 정리해 구매 결정을 도와드립니다.';
const DEFAULT_IMAGE = 'https://specmaru.com/logo.png';

function Layout() {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      {/* 사이트 전역 기본 메타. 각 페이지의 <Helmet>이 동일 항목을 덮어쓴다(react-helmet-async 자동 중복 제거). */}
      <Helmet>
        <title>{DEFAULT_TITLE}</title>
        <meta name="description" content={DEFAULT_DESC} />
        <meta property="og:title" content={DEFAULT_TITLE} />
        <meta property="og:description" content={DEFAULT_DESC} />
        <meta property="og:image" content={DEFAULT_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={DEFAULT_TITLE} />
        <meta name="twitter:description" content={DEFAULT_DESC} />
        <meta name="twitter:image" content={DEFAULT_IMAGE} />
      </Helmet>

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