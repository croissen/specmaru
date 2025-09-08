// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import * as S from './Home.styles';
import { useNavigate, useSearchParams } from 'react-router-dom';

const tabs = [
  { id: 'news', name: '📰 뉴스' },
  { id: 'smartphones', name: '📱 스마트폰' },
  { id: 'earphones', name: '🎧 이어폰' },
  { id: 'laptops', name: '💻 노트북' },
];

function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab') || 'all';
  const [activeTab, setActiveTab] = useState(tabFromUrl);
  const [allProducts, setAllProducts] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // URL과 activeTab 동기화
  useEffect(() => {
    setActiveTab(tabFromUrl);
  }, [tabFromUrl]);

  // 제품 데이터 불러오기
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

  // 뉴스 데이터 불러오기
  useEffect(() => {
    async function fetchNews() {
      try {
        const newsData = await import('../data/news.json');
        setNewsList(newsData.default);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => setCurrentPage(1), [activeTab]);

  const filteredProducts = allProducts
    .filter(product => activeTab === 'all' || product.category === activeTab)
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => (b.name || '').localeCompare(a.name || '', 'ko'));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tabId) => {
    setSearchParams({ tab: tabId === 'all' ? '' : tabId });
  };

  return (
    <S.Container>
      <S.Title>
        <S.TitleFont>스마트하게 비교하고 사자!</S.TitleFont>
        <S.TitleFont>스펙마루</S.TitleFont>
      </S.Title>

      <S.Tabs>
        <S.Tab active={activeTab === 'all'} onClick={() => handleTabClick('all')}>홈</S.Tab>
        {tabs.map(tab => (
          <S.Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </S.Tab>
        ))}
      </S.Tabs>

      {activeTab === 'news' ? (
        <S.ProductList>
          {newsList.map(item => (
            <S.ProductCard
              key={item.id}
              onClick={() => window.open(item.link, '_blank')}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={process.env.PUBLIC_URL + item.thumbnail}
                alt={item.title}
                style={{ width: '100px' }}
              />
              <h3>{item.title}</h3>
            </S.ProductCard>
          ))}
        </S.ProductList>
      ) : (
        <>
          <S.SearchInput
            type="text"
            placeholder="제품명 또는 브랜드 검색"
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />

          <S.ProductList>
            {currentItems.length > 0 ? (
              currentItems.map(product => (
                <S.ProductCard
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
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

          {totalPages > 1 && (
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => goToPage(i + 1)}
                  style={{
                    margin: '0 5px',
                    padding: '5px 10px',
                    backgroundColor: currentPage === i + 1 ? '#0073e6' : '#fff',
                    color: currentPage === i + 1 ? '#fff' : '#000',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <S.ScrollTopButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="맨 위로 이동"
      >
        ⬆ 맨 위로
      </S.ScrollTopButton>
    </S.Container>
  );
}

export default Home;
