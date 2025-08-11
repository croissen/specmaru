import React, { useState, useEffect } from 'react';
import * as S from './Home.styles';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'smartphones', name: '📱 스마트폰', file: 'smartphones.json' },
  { id: 'earphones', name: '🎧 이어폰', file: 'earphones.json' },
  { id: 'laptops', name: '💻 노트북', file: 'laptops.json' },
  // { id: 'homeappliances', name: '🔌 가전제품', file: 'homeappliances.json' }, // 가전제품 추후 추가용
];

/*
const homeApplianceSubTabs = [
  { id: 'washingMachine', name: '세탁기' },
  { id: 'dryer', name: '건조기' },
  { id: 'airConditioner', name: '에어컨' },
  { id: 'refrigerator', name: '냉장고' },
  { id: 'TV', name: 'TV' },
  { id: 'cleaner', name: '청소기' },
  { id: 'riceCooker', name: '밥솥' },
  { id: 'airPurifier', name: '공기청정기' },
  { id: 'dehumidifier', name: '제습기' }
];
*/

// 한글/영어, 띄어쓰기 등 변환 및 소문자화 처리 함수
const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, '')       
    .replace(/프로/g, 'pro')   
    .replace(/맥스/g, 'max')  
    .replace(/갤럭시/g, 'galaxy')  
    .replace(/아이폰/g, 'iphone')
    .replace(/에어팟/g, 'airpods')
    .replace(/버즈/g, 'buds')
    ;  
};

function Home() {
  const [activeTab, setActiveTab] = useState('all');
  // const [subCategory, setSubCategory] = useState(null); // 가전 서브카테고리
  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const smartData = await import(`../data/smartphones.json`);
        const earphoneData = await import(`../data/earphones.json`);
        const laptopData = await import(`../data/laptops.json`);
        /*
        const homeapplianceData = await import(`../data/homeappliances.json`);
        */
        const combined = [
          ...smartData.default.map(p => ({ ...p, category: 'smartphones' })),
          ...earphoneData.default.map(p => ({ ...p, category: 'earphones' })),
          ...laptopData.default.map(p => ({ ...p, category: 'laptops' })),
          // ...homeapplianceData.default.map(p => ({ ...p, category: 'homeappliances' })),
        ];
        setAllProducts(combined);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAllProducts();
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  /*
  useEffect(() => {
    if (activeTab === 'homeappliances') {
      setSubCategory(homeApplianceSubTabs[0].id);
    } else {
      setSubCategory(null);
    }
    setCurrentPage(1);
  }, [activeTab]);
  */

  const exampleComparisons = [
    { id1: 'iphone16', id2: 'galaxyS25', title: '아이폰 16 vs 갤럭시 S25 비교' },
    { id1: 'airpodsPro2', id2: 'galaxyBuds3Pro', title: '에어팟 프로2 vs 갤럭시 버즈3 프로 비교' },
    { id1: 'galaxyBook5Pro', id2: 'macBookAir13', title: '갤럭시북5 프로 vs 맥북 에어 13 비교' },
  ];

  const filteredProducts = allProducts
    .filter(product => {
      const matchesCategory = activeTab === 'all' ? true : product.category === activeTab;

      const normalizedSearch = normalizeText(searchTerm);
      const normalizedId = normalizeText(product.id);
      const normalizedName = normalizeText(product.name);
      const specsString = product.specs
        ? Object.values(product.specs).join(' ')
        : '';
      const normalizedSpecs = normalizeText(specsString);

      return matchesCategory && (
        normalizedId.includes(normalizedSearch) ||
        normalizedName.includes(normalizedSearch) ||
        normalizedSpecs.includes(normalizedSearch)
      );
    })
    .sort((a, b) => (a.name || '').localeCompare(b.name || '', 'ko'));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

      {/* 
      {activeTab === 'homeappliances' && (
        <S.SubTabs>
          {homeApplianceSubTabs.map(sub => (
            <S.SubTab
              key={sub.id}
              active={subCategory === sub.id}
              onClick={() => {
                setSubCategory(sub.id);
                setCurrentPage(1);
              }}
            >
              {sub.name}
            </S.SubTab>
          ))}
        </S.SubTabs>
      )}
      */}

      <S.SearchInput
        type="text"
        placeholder="제품명 또는 브랜드 검색"
        value={searchTerm}
        onChange={e => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
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
        {currentItems.length > 0 ? (
          currentItems.map(product => (
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

      <S.ScrollTopButton
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="맨 위로 이동"
      >
        ⬆ 맨 위로
      </S.ScrollTopButton>

      <footer style={{ textAlign: 'center', padding: '20px', fontSize: '14px' }}>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSchAA0vaJQtxPO1KyGBkQqEJx4S3yAHAok1-FW0Jv33eqUYQw/viewform?usp=dialog"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0073e6', textDecoration: 'none' }}
        >
          💬 의견 보내기
        </a>
      </footer>
    </S.Container>
  );
}

export default Home;
