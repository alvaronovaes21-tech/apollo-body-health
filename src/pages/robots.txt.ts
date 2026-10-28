import type { APIRoute } from 'astro';
import { SITE } from '@/config/site';

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /'];
  // O Sitemap só é declarado quando a URL pública do site está configurada (PUBLIC_SITE_URL).
  if (SITE.url) lines.push('', `Sitemap: ${SITE.url}/sitemap.xml`);
  return new Response(lines.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
