import React, { useState, useEffect } from 'react';
import * as S from './Home.styles';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'smartphones', name: '📱 스마트폰', file: 'smartphones.json' },
  { id: 'earphones', name: '🎧 이어폰', file: 'earphones.json' },
  { id: 'laptops', name: '💻 노트북', file: 'laptops.json' },
];

function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const smartData = await import(`../data/smartphones.json`);
        const earphoneData = await import(`../data/earphones.json`);
        const laptopData = await import(`../data/laptops.json`);
        const combined = [
          ...smartData.default.map(p => ({ ...p, category: 'smartphones' })),
          ...earphoneData.default.map(p => ({ ...p, category: 'earphones' })),
          ...laptopData.default.map(p => ({ ...p, category: 'laptops' })),
        ];
        setAllProducts(combined);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllProducts();
  }, []);

  const exampleComparisons = [
    {
      id1: 'iphone16',
      id2: 'galaxyS25Ultra',
      title: '아이폰 16 vs 갤럭시 S25 울트라비교',
    },
    {
      id1: 'airpodsPro2',
      id2: 'galaxyBuds3Pro',
      title: '에어팟 프로2 vs 갤럭시 버즈3 프로 비교',
    },
    {
      id1: 'galaxyBook5Pro',
      id2: 'macBookAir13',
      title: '갤럭시북5 프로 vs 맥북 에어 13 비교',
    }
  ];

const filteredProducts = allProducts.filter(product => {
  const matchesCategory = activeTab === 'all' ? true : product.category === activeTab;

  const lowerSearch = searchTerm.toLowerCase();

  // 이름에서 검색
  const nameMatch = (product.name?.toLowerCase() || '').includes(lowerSearch);

  // specs 값 전체 합쳐서 검색
  const specsString = product.specs
    ? Object.values(product.specs).join(' ').toLowerCase()
    : '';

  const specsMatch = specsString.includes(lowerSearch);

  return matchesCategory && (nameMatch || specsMatch);
});

  return (
    <S.Container>
      <S.Title>
        <S.TitleFont>스마트하게 비교하고 사자!</S.TitleFont>
        <S.TitleFont>스펙마루</S.TitleFont>
      </S.Title>

      <S.Tabs>
        <S.Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>
          홈
        </S.Tab>
        {tabs.map(tab => (
          <S.Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.name}
          </S.Tab>
        ))}
      </S.Tabs>

      <S.SearchInput
        type="text"
        placeholder="제품명 또는 키워드 검색"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      {activeTab === 'all' && searchTerm.trim() === '' && (
        <S.ExampleComparisonList>
          {exampleComparisons.map(({ id1, id2, title }) => {
            const p1 = allProducts.find(p => p.id === id1);
            const p2 = allProducts.find(p => p.id === id2);

            return (
              <S.ExampleComparisonCard
                key={`${id1}-${id2}`}
                onClick={() => navigate(`/compare/${id1}/${id2}`)}
                style={{ cursor: 'pointer' }}
              >
                <S.ExampleImages>
                  {p1?.image && (
                    <img
                      src={Array.isArray(p1.image) ? p1.image[0] : p1.image}
                      alt={p1.name}
                    />
                  )}
                  <span>vs</span>
                  {p2?.image && (
                    <img
                      src={Array.isArray(p2.image) ? p2.image[0] : p2.image}
                      alt={p2.name}
                    />
                  )}
                </S.ExampleImages>
                <S.ComparisonTitle>{title}</S.ComparisonTitle>
              </S.ExampleComparisonCard>
            );
          })}
        </S.ExampleComparisonList>
      )}

      <S.ProductList>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <S.ProductCard
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{ cursor: 'pointer' }}
              title="상세 페이지로 이동"
            >
              {product.image && (
                <S.ProductImage
                  src={Array.isArray(product.image) ? product.image[0] : product.image}
                  alt={product.name}
                />
              )}
              <h3>{product.name}</h3>
              {product.description && <p>{product.description}</p>}
            </S.ProductCard>
          ))
        ) : (
          <S.NoResult>검색 결과가 없습니다.</S.NoResult>
        )}
      </S.ProductList>
    </S.Container>
  );
}

export default Home;
