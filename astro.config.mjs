import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// URL pública do site (usada em canonical, Open Graph, sitemap e dados estruturados).
// Defina PUBLIC_SITE_URL no arquivo .env (ex.: https://www.seudominio.com.br).
const site = process.env.PUBLIC_SITE_URL || env.PUBLIC_SITE_URL || undefined;

// Caminho base. Padrão: GitHub Pages (https://<usuario>.github.io/apollo-body-health/).
// Para domínio próprio na raiz, defina PUBLIC_BASE_PATH=/ no build.
const base = process.env.PUBLIC_BASE_PATH || env.PUBLIC_BASE_PATH || '/apollo-body-health/';

export default defineConfig({
  // Apenas a origem; o caminho fica em `base`.
  site: site ? new URL(site).origin : undefined,
  base,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
