import { eventsFromDataset, EVENTS } from '../lib/tracking-events.ts';

type ApolloWindow = Window & {
  apolloTrack?: (name: string, params?: Record<string, string>) => void;
};

const w = window as ApolloWindow;

function send(name: string, params: Record<string, string>) {
  w.apolloTrack?.(name, params);
}

/**
 * Um único listener delegado: cada clique gera os eventos uma única vez.
 * Usa apenas "click" (não "auxclick"), evitando contagem dupla.
 */
document.addEventListener('click', (event) => {
  const target = event.target as Element | null;
  const link = target?.closest<HTMLElement>('[data-track]');
  if (!link) return;
  const { track, origin, category, item } = link.dataset;
  for (const e of eventsFromDataset({ track, origin, category, item })) {
    send(e.name, e.params);
  }
});

/** Evento emitido pelo componente de vídeo na primeira reprodução. */
document.addEventListener('apollo:video-play', (event) => {
  const detail = (event as CustomEvent<{ videoId?: string }>).detail;
  send(EVENTS.VIDEO_PLAY, { video_id: detail?.videoId ?? '', click_origin: 'video' });
});
