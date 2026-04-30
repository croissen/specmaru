// src/pages/NewsDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  return (
    <S.Container>
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