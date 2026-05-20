// public/sitemap.xml 생성. 데이터에서 경로를 뽑아 자동 작성.
// build 전에 실행돼 build/sitemap.xml로 함께 배포된다.
const fs = require('fs');
const path = require('path');
const { getRoutes } = require('./routes');

const BASE = 'https://specmaru.com';
const today = new Date().toISOString().slice(0, 10);

// 탭/홈은 우선순위 높게, 상세는 보통
function priorityFor(route) {
  if (route === '/') return '1.0';
  if (route.indexOf('/product/') === 0 || route.indexOf('/news/') === 0) return '0.7';
  return '0.8';
}

const urls = getRoutes()
  .map((route) => {
    const loc = `${BASE}${route === '/' ? '/' : route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priorityFor(route)}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

const outPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`[sitemap] ${getRoutes().length}개 URL → public/sitemap.xml`);
