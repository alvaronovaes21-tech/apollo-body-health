import { EMBEDSOCIAL } from '../config/site.ts';

/**
 * Avaliações públicas do Google via o widget EmbedSocial informado pela academia.
 * A página oficial do widget (URL de incorporação) traz o feed em JSON.
 * Não há scraping do Google nem chave privada: o identificador já é público na URL.
 */

export interface PublicReview {
  id: string;
  authorName: string;
  caption: string;
  /** Null quando a fonte não envia uma nota entre 0 e 5. */
  rating: number | null;
  createdOn: string;
  profilePhotoUrl: string | null;
  sourceLink: string | null;
}

export interface ReviewFeed {
  reviews: PublicReview[];
  averageRating: number | null;
  totalReviews: number | null;
  /** Preenchido somente quando nenhum depoimento pôde ser exibido. */
  unavailableReason: string | null;
}

interface RawReview {
  id?: string | number;
  mediaId?: string | null;
  authorName?: string | null;
  caption?: string | null;
  rating?: number | null;
  originalCreatedOn?: string | null;
  sourceType?: string | null;
  profilePhotoUrl?: string | null;
  sourceLink?: string | null;
}

export interface ParsedWidget {
  averageRating: number | null;
  totalReviews: number | null;
  paginationUrl: string | null;
  media: RawReview[];
}

const RELEVANCE_TERMS = [
  'atendimento',
  'professor',
  'equipe',
  'ambiente',
  'acolh',
  'cuidado',
  'atenc',
  'acompanh',
  'profissional',
  'instrutor',
  'familiar',
  'familia',
  'zelo',
  'respeito',
  'recep',
  'organiz',
  'pelo nome',
  'meu nome',
  'sabem o nome',
  'sabe o nome',
];

const MONTHS = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];

const EMPTY_REASON =
  'O widget público do EmbedSocial não respondeu durante a geração da página. Confirme se o endereço de incorporação continua no ar e publique o site novamente. Nenhum depoimento foi criado manualmente.';

let memory: { expires: number; feed: ReviewFeed } | null = null;

export function fold(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

export function formatReviewDate(createdOn: string): string | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(createdOn.trim());
  if (!match) return null;
  const month = MONTHS[Number(match[2]) - 1];
  if (!month) return null;
  return `${Number(match[3])} ${month} ${match[1]}`;
}

export function formatRating(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

export function initials(name: string): string {
  const parts = name
    .replace(/\([^)]*\)/g, ' ')
    .split(/\s+/)
    .filter((part) => /\p{L}/u.test(part));
  if (parts.length === 0) return '';
  const letter = (part: string) => part.match(/\p{L}/u)?.[0] ?? '';
  const first = letter(parts[0] ?? '');
  const last = parts.length > 1 ? letter(parts[parts.length - 1] ?? '') : '';
  return (first + last).toLocaleUpperCase('pt-BR');
}

export function isEmbedSocialItemsUrl(value: string | null | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname === 'embedsocial.com' &&
      /^\/api\/widget_items\/\d+\/?$/.test(url.pathname)
    );
  } catch {
    return false;
  }
}

function safeHttps(value: string | null | undefined, rootHost: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname;
    const allowed = host === rootHost || host.endsWith(`.${rootHost}`);
    return url.protocol === 'https:' && allowed ? url.toString() : null;
  } catch {
    return null;
  }
}

function clampRating(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 5) return null;
  return value;
}

function readNumber(html: string, name: string): number | null {
  const match = html.match(new RegExp(`window\\.${name}\\s*=\\s*(-?\\d+(?:\\.\\d+)?)`));
  if (!match) return null;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : null;
}

/** Extrai o conteúdo de `window.nome = '...'` respeitando escapes da string JavaScript. */
function readJsString(html: string, name: string): string | null {
  const marker = `window.${name} = '`;
  const start = html.indexOf(marker);
  if (start < 0) return null;
  let out = '';
  for (let i = start + marker.length; i < html.length; i += 1) {
    const char = html[i];
    if (char === '\\') {
      const next = html[i + 1];
      if (next === undefined) return null;
      out += next === "'" ? "'" : next === '\\' ? '\\' : `\\${next}`;
      i += 1;
      continue;
    }
    if (char === "'") return out;
    out += char;
  }
  return null;
}

export function parseWidgetDocument(html: string): ParsedWidget {
  const average = readNumber(html, 'averageRating');
  const total = readNumber(html, 'numMaxMedia');
  const paginationUrl = readJsString(html, 'paginationUrl');
  let media: RawReview[] = [];
  const rawMedia = readJsString(html, 'widgetMedia');
  if (rawMedia) {
    try {
      const parsed = JSON.parse(rawMedia) as unknown;
      if (Array.isArray(parsed)) media = parsed as RawReview[];
    } catch {
      media = [];
    }
  }
  return {
    averageRating: average !== null && average >= 0 && average <= 5 ? average : null,
    totalReviews: total !== null && total >= 0 ? Math.round(total) : null,
    paginationUrl,
    media,
  };
}

function normalize(item: RawReview): PublicReview | null {
  const caption = typeof item.caption === 'string' ? item.caption.replace(/\r\n/g, '\n').trim() : '';
  const authorName = typeof item.authorName === 'string' ? item.authorName.trim() : '';
  if (!caption || !authorName) return null;
  if (item.sourceType && item.sourceType !== 'google') return null;
  const createdOn = typeof item.originalCreatedOn === 'string' ? item.originalCreatedOn.trim() : '';
  return {
    id: String(item.mediaId || item.id || `${authorName}:${caption.slice(0, 32)}`),
    authorName,
    caption,
    rating: clampRating(item.rating),
    createdOn,
    profilePhotoUrl: safeHttps(item.profilePhotoUrl, 'googleusercontent.com'),
    sourceLink: safeHttps(item.sourceLink, 'google.com'),
  };
}

function isStaffNote(caption: string): boolean {
  const text = fold(caption);
  return (
    text.includes('seu amigo e professor') ||
    /\b(sou|eu sou) (o |a )?(professor|professora|instrutor|instrutora|recepcionista)\b/.test(text) ||
    text.includes('trabalho na apollo') ||
    text.includes('faco parte da equipe')
  );
}

export function relevanceHits(caption: string): number {
  const text = fold(caption);
  let hits = 0;
  for (const term of RELEVANCE_TERMS) {
    if (text.includes(fold(term))) hits += 1;
  }
  return hits;
}

/**
 * Prioriza comentários reais sobre atendimento, professores, ambiente e acompanhamento.
 * Não cria texto: só reordena e limita o que a fonte enviou.
 */
export function selectReviews(items: RawReview[], limit = 9): PublicReview[] {
  const seen = new Set<string>();
  const unique: PublicReview[] = [];
  for (const item of items) {
    const review = normalize(item);
    if (!review || isStaffNote(review.caption)) continue;
    const key = fold(review.caption);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(review);
  }

  const ranked = unique
    .map((review) => ({
      review,
      hits: relevanceHits(review.caption),
      length: review.caption.length,
      time: Date.parse(review.createdOn.replace(' ', 'T')) || 0,
    }))
    .sort((a, b) => b.hits - a.hits || b.length - a.length || b.time - a.time);

  const preferred = ranked.filter((entry) => entry.hits > 0 && entry.length >= 40);
  const chosen = preferred.slice(0, limit);
  if (chosen.length < Math.min(6, limit)) {
    for (const entry of ranked) {
      if (chosen.length >= limit) break;
      if (entry.length < 40) continue;
      if (chosen.some((item) => item.review.id === entry.review.id)) continue;
      chosen.push(entry);
    }
  }
  return chosen.slice(0, limit).map((entry) => entry.review);
}

async function fetchJson(url: string): Promise<{ media?: RawReview[]; totalNumMedias?: number } | null> {
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      'user-agent': 'Mozilla/5.0 (compatible; ApolloBodyHealth/1.0)',
    },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) return null;
  return (await response.json()) as { media?: RawReview[]; totalNumMedias?: number };
}

async function fetchAllMedia(paginationUrl: string): Promise<RawReview[]> {
  const firstUrl = new URL(paginationUrl);
  firstUrl.searchParams.set('page', '1');
  const first = await fetchJson(firstUrl.toString());
  const firstMedia = Array.isArray(first?.media) ? first.media : [];
  if (firstMedia.length === 0) return [];
  const total = typeof first?.totalNumMedias === 'number' ? first.totalNumMedias : firstMedia.length;
  const pageCount = Math.min(12, Math.max(1, Math.ceil(total / firstMedia.length)));
  if (pageCount === 1) return firstMedia;

  const rest = await Promise.allSettled(
    Array.from({ length: pageCount - 1 }, (_, index) => {
      const url = new URL(paginationUrl);
      url.searchParams.set('page', String(index + 2));
      return fetchJson(url.toString());
    }),
  );
  const more = rest.flatMap((result) =>
    result.status === 'fulfilled' && Array.isArray(result.value?.media) ? result.value.media : [],
  );
  return [...firstMedia, ...more];
}

async function fetchReviewFeed(): Promise<ReviewFeed> {
  try {
    const response = await fetch(EMBEDSOCIAL.widgetUrl, {
      headers: {
        accept: 'text/html',
        'user-agent': 'Mozilla/5.0 (compatible; ApolloBodyHealth/1.0)',
      },
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) {
      return { reviews: [], averageRating: null, totalReviews: null, unavailableReason: EMPTY_REASON };
    }
    const parsed = parseWidgetDocument(await response.text());
    let source = parsed.media;
    if (isEmbedSocialItemsUrl(parsed.paginationUrl)) {
      try {
        const pages = await fetchAllMedia(parsed.paginationUrl);
        if (pages.length > 0) source = pages;
      } catch {
        source = parsed.media;
      }
    }
    const reviews = selectReviews(source);
    if (reviews.length === 0) {
      return {
        reviews: [],
        averageRating: parsed.averageRating,
        totalReviews: parsed.totalReviews,
        unavailableReason:
          'O widget do EmbedSocial respondeu, mas não trouxe comentários com nome e texto para exibir. Nenhum depoimento foi criado manualmente.',
      };
    }
    return {
      reviews,
      averageRating: parsed.averageRating,
      totalReviews: parsed.totalReviews,
      unavailableReason: null,
    };
  } catch {
    return { reviews: [], averageRating: null, totalReviews: null, unavailableReason: EMPTY_REASON };
  }
}

export async function loadReviewFeed(): Promise<ReviewFeed> {
  if (memory && memory.expires > Date.now()) return memory.feed;
  const feed = await fetchReviewFeed();
  if (feed.reviews.length > 0) memory = { expires: Date.now() + 10 * 60 * 1000, feed };
  return feed;
}
