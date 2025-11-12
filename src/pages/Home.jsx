import React, { useState, useEffect } from 'react';
import * as S from './Home.styles';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Helmet } from 'react-helmet-async';

const tabs = [
  { id: 'all', name: '🏠 홈' }, 
  { id: 'news', name: '📰 뉴스' },
  { id: 'smartphones', name: '📱 스마트폰', file: 'smartphones.json' },
  { id: 'earphones', name: '🎧 이어폰', file: 'earphones.json' },
  { id: 'laptops', name: '💻 노트북', file: 'laptops.json' },
];

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
  const navigate = useNavigate();
  const { tabId } = useParams();
  const activeTab = tabId || 'all';

  const [allProducts, setAllProducts] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [helmetMeta, setHelmetMeta] = useState({
    title: "스펙마루 - 스펙 비교 사이트",
    description: "스마트폰, 노트북, 이어폰 등 다양한 IT 기기의 상세 스펙을 한눈에 비교하고 최고의 제품을 찾아보세요!",
    image: "https://specmaru.com/logo.png" // 기본 로고 이미지
  });

  useEffect(() => {
    let newTitle = "스펙마루 - 스펙 비교 사이트";
    let newDescription = "스마트폰, 노트북, 이어폰 등 다양한 IT 기기의 상세 스펙을 한눈에 비교하고 최고의 제품을 찾아보세요!";

    switch (activeTab) {
      case 'news':
        newTitle = "스펙마루 - 최신 IT 뉴스";
        newDescription = "가장 빠르고 정확한 IT 기기 뉴스를 스펙마루에서 만나보세요.";
        break;
      case 'smartphones':
        newTitle = "스펙마루 - 스마트폰 스펙 비교";
        newDescription = "최신 스마트폰의 상세 스펙과 다양한 제품들을 스펙마루에서 비교해보세요.";
        break;
      case 'earphones':
        newTitle = "스펙마루 - 이어폰 스펙 비교";
        newDescription = "에어팟, 버즈 등 인기 이어폰 스펙을 비교하고 나에게 딱 맞는 제품을 찾아보세요.";
        break;
      case 'laptops':
        newTitle = "스펙마루 - 노트북 스펙 비교";
        newDescription = "사무용, 게이밍 노트북! 스펙마루에서 성능과 가격을 꼼꼼히 비교하세요.";
        break;
      case 'all': 
      default:
        
        break;
    }
    setHelmetMeta(prev => ({ ...prev, title: newTitle, description: newDescription }));
  }, [activeTab]);

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

  useEffect(() => {
    async function fetchNews() {
      try {
        const newsData = await import('../data/news.json');
        setNewsList(newsData.default);
      } catch (err) {
        console.error("뉴스 데이터를 불러오는 데 실패했습니다:", err);
        setNewsList([]);
      }
    }
    fetchNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const exampleComparisons = [
    { id1: 'iphone17Pro', id2: 'galaxyS25Ultra', title: '아이폰 17 Pro vs 갤럭시 S25 Ultra 비교' },
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

      .sort((a, b) => {
      const releaseDateAString = a.specs?.출시일; 
      const dateA = releaseDateAString
        ? new Date(releaseDateAString.replace('.', '-'))
        : new Date(0); // 출시일이 없으면 1970년으로 간주 (가장 오래된 날짜)

      // b 제품의 '출시일' 정보 가져오기
      const releaseDateBString = b.specs?.출시일;
      const dateB = releaseDateBString
        ? new Date(releaseDateBString.replace('.', '-'))
        : new Date(0); // 출시일이 없으면 1970년으로 간주

      // 최신 날짜가 먼저 오도록 내림차순 정렬 (b - a)
      return dateB.getTime() - dateA.getTime();
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabClick = (tabIdToNavigate) => {
    navigate(tabIdToNavigate === 'all' ? '/' : `/${tabIdToNavigate}`);
    setSearchTerm(''); // 탭 변경 시 검색어 초기화
  };


  return (
    <S.Container>
      <Helmet>
        <title>{helmetMeta.title}</title>
        <meta name="description" content={helmetMeta.description} />
        <meta property="og:title" content={helmetMeta.title} />
        <meta property="og:description" content={helmetMeta.description} />
        <meta property="og:image" content={helmetMeta.image} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
      </Helmet>

      <S.Title>
        <S.TitleFont>스마트하게 비교하고 사자!</S.TitleFont>
        <S.TitleFont>스펙마루</S.TitleFont>
      </S.Title>

      <S.Tabs>
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
          {newsList.length > 0 ? (
            newsList.map(item => (
              <S.ProductCard
                key={item.id}
                onClick={() => window.open(item.link, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                {item.thumbnail && (
                  <img
                    src={process.env.PUBLIC_URL + item.thumbnail}
                    alt={item.title}
                    style={{ width: '100px', height: 'auto', objectFit: 'cover' }}
                  />
                )}
                <h3>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
              </S.ProductCard>
            ))
          ) : (
            <S.NoResult>최신 뉴스 정보를 불러오고 있습니다...</S.NoResult>
          )}
        </S.ProductList>
      ) : (
        <>
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
        </>
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