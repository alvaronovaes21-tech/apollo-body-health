/**
 * CATÁLOGO DE EVENTOS (veja docs/MENSURACAO.md)
 * ------------------------------------------------------------------
 * Cada clique em link rastreado gera:
 *   1. UM evento "primário" (whatsapp_click | maps_click | video_play) — é o único candidato a
 *      conversão principal no Google Ads. Ele representa INTENÇÃO de contato, não matrícula.
 *   2. Opcionalmente UM evento "de segmentação" (contact_*_click), usado somente para análise
 *      (relatórios, públicos, conversões secundárias/observação). Nunca marque os dois como
 *      conversão principal: isso duplicaria a contagem do mesmo clique.
 */

export const EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  CONTACT_MODALITY: 'contact_modality_click',
  CONTACT_PLAN: 'contact_plan_click',
  CONTACT_JUDO: 'contact_judo_click',
  CONTACT_BENEFIT: 'contact_benefit_click',
  MAPS_CLICK: 'maps_click',
  VIDEO_PLAY: 'video_play',
} as const;

export type TrackEvent = { name: string; params: Record<string, string> };

export interface TrackDataset {
  track?: string;
  origin?: string;
  category?: string;
  item?: string;
}

const CATEGORY_EVENT: Record<string, string> = {
  modality: EVENTS.CONTACT_MODALITY,
  plan: EVENTS.CONTACT_PLAN,
  judo: EVENTS.CONTACT_JUDO,
  benefit: EVENTS.CONTACT_BENEFIT,
};

/** Converte os data-attributes de um link nos eventos a serem enviados (função pura). */
export function eventsFromDataset(data: TrackDataset): TrackEvent[] {
  const origin = data.origin || 'desconhecido';
  const category = data.category || 'general';
  const item = data.item || '';

  if (data.track === 'whatsapp') {
    const base: Record<string, string> = { click_origin: origin, click_category: category };
    if (item) base.content_name = item;
    const events: TrackEvent[] = [{ name: EVENTS.WHATSAPP_CLICK, params: { ...base } }];
    const specific = CATEGORY_EVENT[category];
    if (specific) events.push({ name: specific, params: { ...base } });
    return events;
  }

  if (data.track === 'maps') {
    const params: Record<string, string> = { click_origin: origin, click_category: category };
    return [{ name: EVENTS.MAPS_CLICK, params }];
  }

  return [];
}
