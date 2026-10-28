import { SECTIONS } from '../config/site.ts';

/** Itens do menu principal (cabeçalho) — texto + âncora da seção. */
export const NAV_ITEMS = [
  { label: 'Início', href: `#${SECTIONS.inicio}` },
  { label: 'Modalidades', href: `#${SECTIONS.modalidades}` },
  { label: 'Planos', href: `#${SECTIONS.planos}` },
  { label: 'Horários', href: `#${SECTIONS.horarios}` },
  { label: 'Judô Infantil', href: `#${SECTIONS.judo}` },
  { label: 'Estrutura', href: `#${SECTIONS.estrutura}` },
  { label: 'Contato', href: `#${SECTIONS.contato}` },
] as const;
