// src/pages/NewsDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as S from './NewsDetail.styles';

function NewsDetail() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchNews() {
      try {
        const data = await import('../data/news.json');
        const found = data.default.find(item => item.id === id);
        setNewsItem(found || null);
      } catch (e) {
        setNewsItem(null);
      }
    }
    fetchNews();
  }, [id]);

  if (newsItem === null) return <S.Message>뉴스를 불러오는 중입니다...</S.Message>;
  if (!newsItem) return <S.Message>해당 뉴스가 없습니다.</S.Message>;

  const pageTitle = `${newsItem.title} | 스펙마루`;
  const pageDesc = (newsItem.summary || newsItem.title).slice(0, 155);
  const canonicalUrl = `https://specmaru.com/news/${newsItem.id}`;
  const absImage = newsItem.thumbnail
    ? (newsItem.thumbnail.startsWith('http') ? newsItem.thumbnail : `https://specmaru.com${newsItem.thumbnail}`)
    : 'https://specmaru.com/logo.png';

  return (
    <S.Container>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={absImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={absImage} />
      </Helmet>

      <S.Buttons>
        <S.BackButton onClick={() => navigate(-1)}>⬅ 뒤로가기</S.BackButton>
        <S.HomeButton onClick={() => navigate('/')}>홈으로</S.HomeButton>
      </S.Buttons>

      <S.Title>{newsItem.title}</S.Title>
      <S.Thumbnail src={newsItem.thumbnail} alt={newsItem.title} />
      <S.Summary>{newsItem.summary}</S.Summary>
      <S.Sections>{newsItem.sections}</S.Sections>
      <S.ScrollTopButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="맨 위로 이동"
      >
        ⬆ 맨 위로
      </S.ScrollTopButton>
    </S.Container>
  );
}

export default NewsDetail;