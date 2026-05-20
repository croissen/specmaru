import React, { useState, useEffect } from 'react';
import * as S from './Home.styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MobileInlineAd from '../components/MobileInlineAd';

const tabs = [
  { id: 'all', name: '🏠 홈' }, 
  { id: 'news', name: '✍️ 소식' }, 
  { id: 'smartphones', name: '📱 스마트폰', file: 'smartphones.json' },
  { id: 'earphones', name: '🎧 이어폰', file: 'earphones.json' },
  { id: 'laptops', name: '💻 노트북', file: 'laptops.json' },
  { id: 'used', name: '♻️ 중고&미개봉' }, 
];

const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\s+/g, '');
};

function Home() {
  const navigate = useNavigate();
  const { tabId } = useParams();
  const activeTab = tabId || 'all';

  const [allProducts, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [subCat, setSubCat] = useState('all'); // 서브카테고리 상태
  const itemsPerPage = 10;

  const [helmetMeta, setHelmetMeta] = useState({
    title: "스펙마루 - 스펙 비교 사이트",
    description: "스마트폰, 노트북, 이어폰 등 다양한 IT 기기의 상세 스펙을 한눈에 비교하고 최고의 제품을 찾아보세요!",
    image: "https://specmaru.com/logo.png"
  });

  useEffect(() => {
    let newTitle = "스펙마루 - 스펙 비교 사이트";
    let newDescription = "스마트폰, 노트북, 이어폰 등 다양한 IT 기기의 상세 스펙을 한눈에 비교하고 최고의 제품을 찾아보세요!";

    switch (activeTab) {
      case 'news':
        newTitle = "스펙마루 - 최신뉴스";
        newDescription = "최신 뉴스를 한눈에 확인해보세요.";
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
      case 'used':
        newTitle = "스펙마루 - 중고폰 & 공기계 비교";
        newDescription = "중고폰, 공기계 가격과 스펙을 스펙마루에서 비교하고 합리적인 구매를 도와드립니다.";
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
        const newsData = await import(`../data/news.json`);
        const smartData = await import(`../data/smartphones.json`);
        const earphoneData = await import(`../data/earphones.json`);
        const laptopData = await import(`../data/laptops.json`);
        const usedData = await import(`../data/used.json`);
        const combined = [
          ...newsData.default.map(p => ({ ...p, category: 'news' })),
          ...smartData.default.map(p => ({ ...p, category: 'smartphones' })),
          ...earphoneData.default.map(p => ({ ...p, category: 'earphones' })),
          ...laptopData.default.map(p => ({ ...p, category: 'laptops' })),
          ...usedData.default.map(p => ({ ...p, category: 'used' })),
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
    setSubCat('all'); // 탭 바뀌면 서브카테 초기화
  }, [activeTab]);

  const exampleComparisons = [
    { id1: 'iphone17ProMax', id2: 'galaxyS26Ultra', title: '아이폰 17 Pro Max vs 갤럭시 S26 Ultra 비교' },
    { id1: 'airpodsPro2', id2: 'galaxyBuds3Pro', title: '에어팟 프로2 vs 갤럭시 버즈3 프로 비교' },
    { id1: 'galaxyBook5Pro', id2: 'macBookAir13', title: '갤럭시북5 프로 vs 맥북 에어 13 비교' },
  ];

  // used 서브탭
  const usedSubTabs = [
    { id: 'all', name: '전체' },
    { id: 'phone', name: '스마트폰' },
    { id: 'note', name: '노트북' },
    { id: 'ear', name: '이어폰' },
  ];

  const filteredProducts = allProducts
    .filter(product => {
      const matchesCategory =
      activeTab === 'all'
        ? ['smartphones', 'earphones', 'laptops'].includes(product.category)
        : product.category === activeTab;
      const matchesSubCat = activeTab === 'used' && subCat !== 'all' ? product.cat === subCat : true;

      const normalizedSearch = normalizeText(searchTerm);
      const normalizedId = normalizeText(product.id);
      const normalizedName = normalizeText(
        product.name || product.title || ''
      );

      const specsString = product.specs
        ? Object.values(product.specs).join(' ')
        : '';

      const newsString = [
        product.summary || '',
        Array.isArray(product.sections)
          ? product.sections.map(s => `${s.subtitle} ${s.content}`).join(' ')
          : product.sections || ''
      ].join(' ');

      const normalizedSpecs = normalizeText(
        specsString + ' ' + newsString
      );

      return matchesCategory && matchesSubCat && (
        normalizedId.includes(normalizedSearch) ||
        normalizedName.includes(normalizedSearch) ||
        normalizedSpecs.includes(normalizedSearch)
      );
    })
    .sort((a, b) => {
      const dateA = a.specs?.출시일 ? new Date(a.specs.출시일.replace('.', '-')) : new Date(0);
      const dateB = b.specs?.출시일 ? new Date(b.specs.출시일.replace('.', '-')) : new Date(0);
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
    setSearchTerm('');
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

      {/* used 서브탭 렌더링 */}
      {activeTab === 'used' && (
        <S.SubTabs>
          {usedSubTabs.map(sub => (
            <S.SubTab
              key={sub.id}
              active={subCat === sub.id}
              onClick={() => setSubCat(sub.id)}
            >
              {sub.name}
            </S.SubTab>
          ))}
        </S.SubTabs>
      )}

      {/* 사이트 내 검색은 used 탭 제외 */}
      {activeTab !== 'used' && (
        <S.SearchInput
          type="text"
          placeholder="키워드 검색"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      )}

      {/* 모바일 인라인 광고: 홈(all)·중고(used) 탭 제외, 검색창 바로 아래 */}
      {activeTab !== 'all' && activeTab !== 'used' && <MobileInlineAd />}

      {/* used 탭에서는 쿠팡 검색 위젯 */}
      {activeTab === 'used' && (
        <div style={{ margin: '20px 0' }}>
          <iframe
            src="https://coupa.ng/ckT9n4"
            width="80%"
            height="44"
            frameBorder="0"
            scrolling="no"
            referrerPolicy="unsafe-url"
            browsingTopics
          ></iframe>
        </div>
      )}

      {/* 예시 비교 카드: all 탭, 검색어 없을 때만 */}
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

      {/* 제품 리스트 */}
      <S.ProductList>
        {currentItems.length > 0 ? (
          activeTab === "used" ? (
            [...currentItems]
              .sort((a, b) =>  Number((a.price || '0').replace(/[^\d]/g, '')) - Number((b.price || '0').replace(/[^\d]/g, '')))
              .map(item => (
                <S.ProductCard
                  key={item.id}
                  className="used-card"
                  onClick={() => window.open(item.link)}
                >
                  <S.ProductImage src={item.thumbnail} alt={item.name} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                  </div>
                </S.ProductCard>
              ))
              ) : activeTab === "news" ? (
                currentItems.map(item => (
                  <S.ProductCard
                    key={item.id}
                    onClick={() => navigate(`/news/${item.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.thumbnail && (
                      <S.ProductImage
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    )}
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                  </S.ProductCard>
                ))
              ) : (
            
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
            )
        ) : (
          <S.NoResult>검색 결과가 없습니다.</S.NoResult>
        )}
      </S.ProductList>

      {/* 페이지네이션 */}
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

    </S.Container>
  );
}

export default Home;
