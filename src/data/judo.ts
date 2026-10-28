import { MESSAGES } from '../lib/messages.ts';

/**
 * NOVAS TURMAS DE JUDÔ (infantil e juvenil) — em formação.
 * A faixa etária exata ainda será confirmada pela academia: NÃO inventar idade mínima/máxima.
 * Quando confirmada, preencha `ageRange` (ex.: 'A partir de X anos') e ela passará a ser exibida.
 */
export const JUDO = {
  title: 'Judô para crianças e adolescentes: novas turmas em formação!',
  subtitle:
    'Uma oportunidade para aprender judô, desenvolver habilidades e vivenciar os valores das artes marciais.',
  audience: 'Crianças e adolescentes',
  /** Preencher somente quando a academia confirmar. */
  ageRange: '',
  days: 'Terças e quintas-feiras',
  classes: [
    { label: 'Turma 1', time: 'Das 08h às 09h' },
    { label: 'Turma 2', time: 'Das 16h às 17h' },
  ],
  price: 'R$ 166,00',
  priceSuffix: 'mensalidade',
  highlight: 'Estamos formando duas turmas. Entre em contato e consulte as vagas!',
  cta: 'Quero informações sobre o Judô',
  whatsappMessage: MESSAGES.judo,
  imageAlt:
    'Crianças praticando artes marciais de kimono sobre o tatame (imagem ilustrativa provisória)',
} as const;
