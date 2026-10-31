/**
 * CONFIGURAÇÃO CENTRAL DO SITE
 * ------------------------------------------------------------------
 * Tudo o que muda com frequência (telefone, localização, vídeo, redes sociais,
 * integrações de mensuração) está neste arquivo ou em variáveis de ambiente
 * (.env). Veja README.md e docs/MENSURACAO.md.
 */

// `import.meta.env` não existe fora do Astro/Vite (ex.: testes em Node); por isso o fallback.
const env: Record<string, unknown> =
  (import.meta as unknown as { env?: Record<string, unknown> }).env ?? {};

/** Remove espaços e devolve string vazia para valores ausentes. */
const clean = (value: unknown): string => (typeof value === 'string' ? value.trim() : '');

export const SITE = {
  name: 'Apollo Body & Health',
  shortName: 'Apollo',
  city: 'Salvador',
  region: 'BA',
  country: 'BR',
  locale: 'pt-BR',
  language: 'pt-BR',

  /** URL pública do site. Defina PUBLIC_SITE_URL no .env para canonical/OG/sitemap corretos. */
  url: clean(env.PUBLIC_SITE_URL).replace(/\/$/, ''),

  seo: {
    title: 'Academia Apollo Body & Health | Musculação e Artes Marciais',
    description:
      'Conheça a Apollo Body & Health em Salvador, BA. Musculação, ritmos, boxe, Jiu-Jitsu e novas turmas de Judô. Consulte planos, horários e fale com nossa equipe.',
    /** Imagem de compartilhamento (arquivo em /public). */
    ogImage: '/og-image.jpg',
    ogImageAlt: 'Apollo Body & Health – musculação, aulas coletivas e artes marciais em Salvador, BA',
    themeColor: '#05080d',
  },
} as const;

/**
 * WHATSAPP
 * Número no formato internacional, somente dígitos: 55 + DDD + número.
 * (71) 99907-6612  ->  5571999076612
 */
export const CONTACT = {
  whatsappNumber: '5571999076612',
  phoneDisplay: '(71) 99907-6612',
} as const;

/** LOCALIZAÇÃO — somente o link oficial fornecido. Não há endereço/coordenadas confirmados. */
export const LOCATION = {
  /** Link oficial do Google Maps fornecido pela academia. */
  mapsUrl: 'https://www.google.com/maps/place/Apollo+Body+%26+Health+-+Academia+de+muscula%C3%A7%C3%A3o/@-12.9807408,-38.4469645,17z/data=!3m1!4b1!4m6!3m5!1s0x7161b988d25f4fd:0x2a42ec90981ba014!8m2!3d-12.9807408!4d-38.4469645!16s%2Fg%2F11hz0sn786',
  /**
   * URL de incorporação oficial do Google Maps (Compartilhar > Incorporar um mapa > copiar o "src" do iframe).
   * Enquanto estiver vazio, o mapa incorporado não é exibido e os botões continuam funcionando.
   */
  embedUrl: '',
  /** Endereço completo — preencher somente quando confirmado. Se vazio, não é exibido. */
  address: '',
  neighborhood: '',
} as const;

/** VÍDEO DE APRESENTAÇÃO (YouTube). Defina o ID em PUBLIC_YOUTUBE_VIDEO_ID (.env) ou aqui. */
export const YOUTUBE_VIDEO_ID: string = clean(env.PUBLIC_YOUTUBE_VIDEO_ID) || '';

/** REDES SOCIAIS E PÁGINAS LEGAIS — vazio = não exibido. */
export const SOCIAL = {
  instagramUrl: clean(env.PUBLIC_INSTAGRAM_URL) || '',
  privacyUrl: clean(env.PUBLIC_PRIVACY_URL) || '',
  cookiesUrl: clean(env.PUBLIC_COOKIES_URL) || '',
} as const;

/** MENSURAÇÃO — IDs vêm do .env. Vazio = integração desativada (a página funciona normalmente). */
export const ANALYTICS = {
  gtmId: clean(env.PUBLIC_GTM_ID),
  ga4Id: clean(env.PUBLIC_GA4_ID),
  googleAdsId: clean(env.PUBLIC_GOOGLE_ADS_ID),
  /** Quando "true", o consentimento (Consent Mode v2) começa como "negado". */
  consentMode: clean(env.PUBLIC_CONSENT_MODE).toLowerCase() === 'true',
} as const;

/**
 * Widget público de avaliações do Google (EmbedSocial).
 * O identificador faz parte da URL de incorporação fornecida pela academia.
 * Não é chave privada, token ou credencial.
 */
export const EMBEDSOCIAL = {
  widgetUrl: 'https://embedsocial.com/api/pro_hashtag/dcefdc59a1109064adcedccc94afe5c144fd14b0/',
} as const;

/**
 * BLACK FRIDAY — novembro de 2026.
 * Para encerrar a campanha, mude `enabled` para false e publique de novo.
 * Isso remove o destaque do Club+ Apollo e as perguntas da promoção.
 * Não altera preços, benefícios originais, Jiu-Jitsu nem Judô.
 */
export const BLACK_FRIDAY = {
  enabled: true,
  /** Único plano da oferta. Não usar nos planos mensal, semestral, Jiu-Jitsu ou Judô. */
  planId: 'club-plus-apollo',
  eyebrow: 'BLACK FRIDAY APOLLO',
  headline: '15 MESES DE ACADEMIA PELO PREÇO DE 12!',
  text: 'Contrate o plano anual Club+ Apollo por R$ 1.176,00 e ganhe mais 3 meses para cuidar de você, da sua saúde e dos seus objetivos.',
  installment: '12x de R$ 98,00',
  total: 'Ou R$ 1.176,00 no total.',
  seal: 'GANHE 3 MESES EXTRAS',
  deadline: 'Oferta válida somente durante novembro de 2026.',
  cta: 'QUERO APROVEITAR A BLACK FRIDAY',
  message:
    'Olá! Vi a oferta de Black Friday da Apollo Body & Health e tenho interesse no plano anual Club+ Apollo de R$ 1.176,00, com 3 meses extras. Gostaria de saber como aproveitar a promoção.',
  faq: [
    {
      question: 'Como funciona a promoção de Black Friday?',
      answer:
        'Durante novembro de 2026, contratando o plano anual Club+ Apollo por R$ 1.176,00, com possibilidade de parcelamento em até 12x de R$ 98,00, você ganha mais 3 meses de academia.',
    },
    {
      question: 'A promoção vale para todos os planos?',
      answer: 'Não. A oferta de Black Friday é exclusiva para a contratação do plano anual Club+ Apollo.',
    },
  ],
} as const;

/** Convenções de IDs/âncoras das seções (usadas no menu, rodapé e campanhas). */
export const SECTIONS = {
  inicio: 'inicio',
  comparacao: 'comparacao',
  valores: 'diferenciais',
  depoimentos: 'depoimentos',
  modalidades: 'modalidades',
  judo: 'judo-infantil',
  planos: 'planos',
  beneficio: 'wellhub-totalpass',
  horarios: 'horarios',
  estrutura: 'estrutura',
  video: 'video',
  contato: 'contato',
  faq: 'faq',
} as const;
