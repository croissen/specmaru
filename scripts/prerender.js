// 빌드된 SPA(build/)를 크롤링해 각 경로를 정적 HTML로 구워낸다.
// 크롤러(구글/네이버)가 빈 "JavaScript를 활성화 해주세요" 대신 실제 콘텐츠를 받게 됨.
const { run } = require('react-snap');
const { getRoutes } = require('./routes');

const routes = getRoutes();
console.log(`[prerender] ${routes.length}개 경로 프리렌더 시작`);

run({
  source: 'build',
  include: routes,
  // 정적 HTML이라 캐싱 자유. styled-components는 그대로 두고 critical CSS 인라인은 끔(안정성).
  inlineCss: false,
  // 링크 따라 추가 크롤링까지(혹시 누락된 경로 보완)
  crawl: true,
  // 오래된 번들 puppeteer가 샌드박스에서 종종 실패 → 비활성화
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  // 시스템에 설치된 Chrome을 쓰려면 PUPPETEER_EXECUTABLE_PATH 환경변수로 지정
  puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
})
  .then(() => {
    console.log('[prerender] 완료');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[prerender] 실패:', err);
    process.exit(1);
  });
