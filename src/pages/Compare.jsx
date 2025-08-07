import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './Compare.styles';

function Compare() {
  const { id1, id2 } = useParams();
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [searchTarget, setSearchTarget] = useState(null); // 'left' or 'right'
  const navigate = useNavigate();

  // inputRef 분리
  const leftInputRef = useRef(null);
  const rightInputRef = useRef(null);

  // 제목 높이 맞춤용 ref와 state
  const leftTitleRef = useRef(null);
  const rightTitleRef = useRef(null);
  const [titleHeight, setTitleHeight] = useState('auto');

  const datasets = ['smartphones', 'earphones', 'laptops'];

  async function findProductById(id) {
    for (let category of datasets) {
      try {
        const data = await import(`../data/${category}.json`);
        const match = data.default.find(p => p.id === id);
        if (match) {
          return { ...match, category };
        }
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  }

  async function searchProducts(term) {
    if (!term) {
      setSearchResults([]);
      setSelectedIndex(-1);
      return;
    }
    const lowerTerm = term.toLowerCase();
    let allProducts = [];
    for (let category of datasets) {
      try {
        const data = await import(`../data/${category}.json`);
        const productsWithCategory = data.default.map(p => ({ ...p, category }));
        allProducts = allProducts.concat(productsWithCategory);
      } catch (e) {
        console.error(e);
      }
    }
    const results = allProducts.filter(p => p.name.toLowerCase().includes(lowerTerm));
    setSearchResults(results);
    setSelectedIndex(-1);
  }

  useEffect(() => {
    async function fetchInitial() {
      const p1 = await findProductById(id1);
      setProduct1(p1);

      if (id2) {
        const p2 = await findProductById(id2);
        setProduct2(p2);
      } else {
        setProduct2(null);
      }
    }
    fetchInitial();
  }, [id1, id2]);

  // 제목 높이 맞추기: product1 또는 product2 바뀔 때마다 실행
  useEffect(() => {
    if (leftTitleRef.current && rightTitleRef.current) {
      const leftHeight = leftTitleRef.current.getBoundingClientRect().height;
      const rightHeight = rightTitleRef.current.getBoundingClientRect().height;
      setTitleHeight(Math.max(leftHeight, rightHeight));
    }
  }, [product1, product2, searchTerm, searchResults, selectedIndex]);

  const allSpecKeys = Array.from(new Set([
    ...Object.keys(product1?.specs || {}),
    ...Object.keys(product2?.specs || {}),
  ]));

  function handleKeyDown(e) {
    if (searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        const selectedProduct = searchResults[selectedIndex];

        if (searchTarget === 'right' && product1 && selectedProduct.category !== product1.category) {
          alert(`비교하려는 제품은 동일한 종류여야 합니다.`);
          return;
        }
        if (searchTarget === 'left' && product2 && selectedProduct.category !== product2.category) {
          alert(`비교하려는 제품은 동일한 종류여야 합니다.`);
          return;
        }

        if (searchTarget === 'left') {
          setProduct1(selectedProduct);
        } else if (searchTarget === 'right') {
          setProduct2(selectedProduct);
        }
        setSearchTerm('');
        setSearchResults([]);
        setSelectedIndex(-1);
        setSearchTarget(null);
      }
    }
  }

  return (
    <S.Container>
      <S.HeaderButtons>
        <S.BackButton onClick={() => navigate(-1)} title="뒤로가기">
          ⬅ 뒤로가기
        </S.BackButton>
        <S.HomeButton onClick={() => navigate('/')} title="홈으로">
          홈으로
        </S.HomeButton>
      </S.HeaderButtons>

      <h1>스펙 비교</h1>
      <S.CompareTable>
        <thead>
          <tr>
            <th>제품명</th>
            <th>
              {product1 ? (
                <>
                  <S.TitleDiv style={{ height: titleHeight }} ref={leftTitleRef} onClick={() => navigate(`/product/${product1.id}`)}>
                    {product1.name}
                      <S.MinusBtn
                        onClick={(e) => {
                          e.stopPropagation(); // <-- 클릭 이벤트가 TitleDiv로 안 올라가게 막음
                          setProduct1(null);
                          setSearchTarget('left');
                          setSearchTerm('');
                          setSearchResults([]);
                        }}
                        title="선택 해제"
                      >
                        -
                      </S.MinusBtn>
                  </S.TitleDiv>
                  <S.ProductImage
                    src={Array.isArray(product1.image) ? product1.image[0] : product1.image}
                    alt={product1.name}
                    onClick={() => navigate(`/product/${product1.id}`)}
                  />
                  {product1.buyLink && (
                    <S.BuyButton onClick={() => window.open(product1.buyLink, '_blank')}>
                      구매하러 가기
                    </S.BuyButton>
                  )}
                </>
              ) : (
                <>
                  <S.SearchIn
                    ref={leftInputRef}
                    type="text"
                    placeholder="비교할 제품 검색"
                    value={searchTarget === 'left' ? searchTerm : ''}
                    onChange={e => {
                      if (searchTarget === 'left') {
                        setSearchTerm(e.target.value);
                        searchProducts(e.target.value);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setSearchTarget('left')}
                    autoFocus={searchTarget === 'left'}
                  />
                  {searchTarget === 'left' && searchTerm && searchResults.length > 0 && (
                    <S.SearchDiv>
                      {searchResults.map((p, index) => (
                        <div
                          key={p.id}
                          style={{
                            padding: '8px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee',
                            backgroundColor: selectedIndex === index ? '#bae7ff' : 'transparent',
                          }}
                          onClick={() => {
                            if (product2 && p.category !== product2.category) {
                              alert(`비교하려는 제품은 동일한 종류여야 합니다.`);
                              return;
                            }
                            setProduct1(p);
                            setSearchTerm('');
                            setSearchResults([]);
                            setSelectedIndex(-1);
                            setSearchTarget(null);
                          }}
                        >
                          {p.name}
                        </div>
                      ))}
                    </S.SearchDiv>
                  )}
                </>
              )}
            </th>
            <th>
              {product2 ? (
                <>
                  <S.TitleDiv style={{ height: titleHeight }} ref={rightTitleRef} onClick={() => navigate(`/product/${product2.id}`)}>
                    {product2.name}
                    <S.MinusBtn
                      onClick={(e) => {
                        e.stopPropagation(); // ← 클릭 이벤트 상위 전파 차단
                        setProduct2(null);
                        setSearchTarget('right');
                        setSearchTerm('');
                        setSearchResults([]);
                      }}
                      title="선택 해제"
                    >
                      -
                    </S.MinusBtn>
                  </S.TitleDiv>
                  <S.ProductImage
                    src={Array.isArray(product2.image) ? product2.image[0] : product2.image}
                    alt={product2.name}
                    onClick={() => navigate(`/product/${product2.id}`)}
                  />
                  {product2.buyLink && (
                    <S.BuyButton onClick={() => window.open(product2.buyLink, '_blank')}>
                      구매하러 가기
                    </S.BuyButton>
                  )}
                </>
              ) : (
                <>
                  <S.SearchIn
                    ref={rightInputRef}
                    type="text"
                    placeholder="비교할 제품 검색"
                    value={searchTarget === 'right' ? searchTerm : ''}
                    onChange={e => {
                      if (searchTarget === 'right') {
                        setSearchTerm(e.target.value);
                        searchProducts(e.target.value);
                      }
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setSearchTarget('right')}
                    autoFocus={searchTarget === 'right'}
                  />
                  {searchTarget === 'right' && searchTerm && searchResults.length > 0 && (
                    <S.SearchDiv>
                      {searchResults.map((p, index) => (
                        <div
                          key={p.id}
                          style={{
                            padding: '8px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee',
                            backgroundColor: selectedIndex === index ? '#bae7ff' : 'transparent',
                          }}
                          onClick={() => {
                            if (product1 && p.category !== product1.category) {
                              alert(`비교하려는 제품은 동일한 종류여야 합니다.`);
                              return;
                            }
                            setProduct2(p);
                            setSearchTerm('');
                            setSearchResults([]);
                            setSelectedIndex(-1);
                            setSearchTarget(null);
                          }}
                        >
                          {p.name}
                        </div>
                      ))}
                    </S.SearchDiv>
                  )}
                </>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {allSpecKeys.map(key => (
            <tr key={key}>
              <td>{key}</td>
              <td>
                {product1?.specs?.[key]
                  ? product1.specs[key].split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  : '-'}
              </td>
              <td>
                {product2?.specs?.[key]
                  ? product2.specs[key].split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </S.CompareTable>

      <S.ScrollTopButton
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="맨 위로 이동"
    >
      ⬆ 맨 위로
    </S.ScrollTopButton>

      <S.CoupangMent>이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.</S.CoupangMent>
    </S.Container>
  );
}

export default Compare;
