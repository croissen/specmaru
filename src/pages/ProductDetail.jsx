// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import * as S from './ProductDetail.styles';
import MobileInlineAd from '../components/MobileInlineAd';

// 제품명 + 핵심 스펙으로 검색결과 클릭을 부르는 description 생성
function buildDescription(product) {
  const s = product.specs || {};
  const picks = ['출시일', '디스플레이', '프로세서', 'AP', 'CPU', 'RAM', '메모리', '저장공간', '카메라', '배터리', '무게', '가격']
    .map((k) => (s[k] ? `${k} ${String(s[k]).split('\n')[0]}` : null))
    .filter(Boolean)
    .slice(0, 4);
  const specPart = picks.length ? ` ${picks.join(' · ')}.` : '';
  return `${product.name} 스펙 정리.${specPart} 스펙마루에서 비슷한 제품과 한눈에 비교해보세요.`;
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      const datasets = ['smartphones', 'earphones', 'laptops'];

      for (let category of datasets) {
        try {
          const data = await import(`../data/${category}.json`);
          const match = data.default.find(p => p.id === id);
          if (match) {
            setProduct({ ...match, category });
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) return <p>로딩 중...</p>;

  const pageTitle = `${product.name} 스펙·가격 비교 | 스펙마루`;
  const pageDesc = buildDescription(product);
  const pageImage = Array.isArray(product.image) ? product.image[0] : product.image;
  const canonicalUrl = `https://specmaru.com/product/${product.id}`;
  const absImage = pageImage
    ? (pageImage.startsWith('http') ? pageImage : `https://specmaru.com${pageImage}`)
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
        <meta property="og:type" content="product" />
        <meta property="og:locale" content="ko_KR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={absImage} />
      </Helmet>

      {/* 뒤로가기 버튼 */}
      <S.HeaderButtons>
        <S.BackButton onClick={() => navigate(-1)} title="뒤로가기">
          ⬅ 뒤로가기
        </S.BackButton>
        <S.HomeButton onClick={() => navigate('/')} title="홈으로">
          홈으로
        </S.HomeButton>
      </S.HeaderButtons>

      {/* 모바일 인라인 광고: 뒤로가기/홈으로 바로 아래 */}
      <MobileInlineAd />

      <h1>{product.name}</h1>

      {/* 이미지 슬라이더 */}
      <ImageSlider images={product.image} />
      <S.ButtonDiv>
        <S.BuyButton href={product.buyLink} target="_blank" rel="noopener noreferrer">
          저렴한 가격보기
        </S.BuyButton>
        <S.CompareButton to={`/compare/${id}`}>스펙 비교하기</S.CompareButton>
      </S.ButtonDiv>
      {/* 스펙 테이블 */}
      <S.SpecTable>
        <tbody>
          {product.specs &&
            Object.entries(product.specs).map(([key, value]) => (
              <tr key={key}>
                <th>{key}</th>
                <td>
                  {typeof value === 'string'
                    ? value.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))
                    : value}
                </td>
              </tr>
            ))}
        </tbody>
      </S.SpecTable>

      {/* 버튼 영역 */}


    </S.Container>
  );
}

// 이미지 슬라이더 컴포넌트
function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);

  // images가 배열인지 체크 후, 아니면 단일 이미지로 배열 처리
  const imgs = Array.isArray(images) ? images : [images];

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? imgs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent(prev => (prev === imgs.length - 1 ? 0 : prev + 1));
  };

  if (imgs.length === 0 || !imgs[0]) return null;

  return (
    <S.ImageSliderWrapper>
      {imgs.length > 1 && <S.Arrow onClick={handlePrev}>◀</S.Arrow>}
      <S.SliderImage 
        src={imgs[current].startsWith('http') ? imgs[current] : imgs[current]} 
        alt={`이미지 ${current + 1}`} 
      />
      {imgs.length > 1 && <S.Arrow onClick={handleNext}>▶</S.Arrow>}
      
    </S.ImageSliderWrapper>
  );
}

export default ProductDetail;
