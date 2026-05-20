// 데이터(JSON)에서 프리렌더/사이트맵 대상 경로를 자동 생성한다.
// 제품/뉴스가 추가돼도 빌드 때마다 자동 반영됨 — 경로를 손으로 관리할 필요 없음.
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'src', 'data');

function idsOf(file) {
  try {
    const raw = fs.readFileSync(path.join(dataDir, file), 'utf-8');
    return JSON.parse(raw).map((item) => item.id).filter(Boolean);
  } catch (e) {
    console.warn(`[routes] ${file} 읽기 실패:`, e.message);
    return [];
  }
}

function getRoutes() {
  const tabRoutes = ['/', '/news', '/smartphones', '/earphones', '/laptops', '/used'];

  const productRoutes = []
    .concat(idsOf('smartphones.json'))
    .concat(idsOf('earphones.json'))
    .concat(idsOf('laptops.json'))
    .map((id) => `/product/${id}`);

  const newsRoutes = idsOf('news.json').map((id) => `/news/${id}`);

  // used 항목은 외부 쇼핑몰로 나가므로 자체 상세 페이지 없음 → 제외
  // compare는 조합형 도구 페이지라 색인 대상에서 제외
  return [...tabRoutes, ...productRoutes, ...newsRoutes];
}

module.exports = { getRoutes, idsOf };
