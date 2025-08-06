// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './ProductDetail.styles';

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

  return (
    <S.Container>
      {/* 뒤로가기 버튼 */}
      <S.BackButton onClick={() => navigate(-1)} title="뒤로가기">
        ⬅ 뒤로가기
      </S.BackButton>

      <h1>{product.name}</h1>

      {/* 이미지 슬라이더 */}
      <ImageSlider images={product.image} />

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
      <S.ButtonDiv>
        <S.BuyButton href={product.buyLink} target="_blank" rel="noopener noreferrer">
          구매하러 가기
        </S.BuyButton>
        <S.CompareButton to={`/compare/${id}`}>스펙 비교하기</S.CompareButton>
      </S.ButtonDiv>

      {/* 쿠팡 문구 */}
      <S.CoupangMent>
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </S.CoupangMent>
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
        src={imgs[current].startsWith('http') ? imgs[current] : 'https:' + imgs[current]} 
        alt={`이미지 ${current + 1}`} 
      />
      {imgs.length > 1 && <S.Arrow onClick={handleNext}>▶</S.Arrow>}
    </S.ImageSliderWrapper>
  );
}

export default ProductDetail;
