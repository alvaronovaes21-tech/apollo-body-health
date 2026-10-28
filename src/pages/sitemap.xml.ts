import type { APIRoute } from 'astro';
import { SITE } from '@/config/site';

/** Sitemap XML. As URLs são absolutas e dependem de PUBLIC_SITE_URL (sem ela, o arquivo fica sem entradas). */
const PAGES = ['/'];

export const GET: APIRoute = () => {
  const urls = SITE.url
    ? PAGES.map((p) => `  <url>\n    <loc>${SITE.url}${p}</loc>\n  </url>`).join('\n')
    : '  <!-- Defina PUBLIC_SITE_URL no .env para gerar as URLs absolutas do sitemap. -->';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
