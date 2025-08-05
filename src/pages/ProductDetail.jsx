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
      {product.image && <S.ProductImage src={product.image} alt={product.name} />}
      <p>{product.description}</p>

      <S.SpecTable>
        <tbody>
          {product.specs && Object.entries(product.specs).map(([key, value]) => (
            <tr key={key}>
              <th>{key}</th>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </S.SpecTable>

      <S.BuyButton href={product.buyLink} target="_blank" rel="noopener noreferrer">
        구매하러 가기
      </S.BuyButton>

      <S.CompareButton to={`/compare/${id}`}>스펙 비교하기</S.CompareButton>
      <h5>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</h5>
    </S.Container>
  );
}

export default ProductDetail;
