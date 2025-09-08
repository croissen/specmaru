import React, { useState, useEffect } from 'react';
import * as S from './Home.styles';
import { useNavigate, useParams } from 'react-router-dom'; // ✨ useParams를 사용해서 URL 경로 직접 처리!
import { Helmet } from 'react-helmet-async'; // Helmet은 유지!

const tabs = [
  { id: 'all', name: '🏠 홈' }, // 홈 탭도 tabs 배열에 포함시켰어요.
  { id: 'news', name: '📰 뉴스' },
  { id: 'smartphones', name: '📱 스마트폰', file: 'smartphones.json' },
  { id: 'earphones', name: '🎧 이어폰', file: 'earphones.json' },
  { id: 'laptops', name: '💻 노트북', file: 'laptops.json' },
];

// 한글/영어, 띄어쓰기 등 변환 및 소문자화 처리 함수 (기존과 동일)
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
  // ✨ URL 경로의 파라미터에서 탭 ID를 가져옴. (예: /news -> 'news')
  const { tabId } = useParams();
  // URL에서 가져온 tabId가 없으면 'all' (홈 탭)로 설정
  const activeTab = tabId || 'all';

  const [allProducts, setAllProducts] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Helmet 메타 정보 (탭에 따라 title, description 변경)
  const [helmetMeta, setHelmetMeta] = useState({
    title: "스펙마루 - 스펙 비교 사이트",
    description: "스마트폰, 노트북, 이어폰 등 다양한 IT 기기의 상세 스펙을 한눈에 비교하고 최고의 제품을 찾아보세요!",
    image: "https://specmaru.com/logo.png" // 기본 로고 이미지
  });

  // ✨ activeTab 변경에 따라 Helmet Meta 정보 업데이트 (title, description만 변경)
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
      case 'all': // 홈 탭
      default:
        // 기본 값 유지
        break;
    }
    setHelmetMeta(prev => ({ ...prev, title: newTitle, description: newDescription }));
  }, [activeTab]);


  // 제품 데이터 불러오기 (기존과 동일)
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

  // 뉴스 데이터 불러오기 (기존과 동일)
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

  // 탭 변경 시 페이지 1로 초기화 (기존과 동일)
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

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

      .sort((a, b) => {
      // a 제품의 '출시일' 정보 가져오기
      const releaseDateAString = a.specs?.출시일; // 'specs' 객체 안에 '출시일'이 있는지 확인
      // "2024.09" -> "2024-09" 형태로 변환 (Date 객체가 인식하기 쉽게)
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

  // ✨ 탭 클릭 핸들러: navigate를 사용하여 URL을 변경!
  const handleTabClick = (tabIdToNavigate) => {
    // 'all' 탭은 루트 경로 '/'로 이동하고, 다른 탭은 '/탭ID' 경로로 이동
    navigate(tabIdToNavigate === 'all' ? '/' : `/${tabIdToNavigate}`);
    // URL이 변경되면서 Home 컴포넌트가 다시 렌더링되고 useParams로 activeTab이 업데이트됩니다.
    // setCurrentPage(1); // URL 변경 시 activeTab 변경 useEffect에서 이미 처리
    setSearchTerm(''); // 탭 변경 시 검색어 초기화
  };


  return (
    <S.Container>
      {/* Helmet (head 태그 변경용) */}
      <Helmet>
        <title>{helmetMeta.title}</title>
        <meta name="description" content={helmetMeta.description} />
        {/* Open Graph 태그는 곽승민6071이 원치 않아 간단하게만 남겨두었습니다. */}
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

      {/* 뉴스 탭 내용 조건부 렌더링 */}
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
          {/* 뉴스 탭이 아닐 때 보여줄 기존 내용 */}
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