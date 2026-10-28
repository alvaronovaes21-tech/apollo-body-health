import { MESSAGES } from '../lib/messages.ts';

/**
 * MODALIDADES E HORÁRIOS
 * Os horários abaixo seguem exatamente o material oficial. Não adicionar horários,
 * durações ou disponibilidade de vagas que não tenham sido confirmados.
 *
 * Foto real: coloque o arquivo em src/assets/images/modalidades/<imageKey>.(jpg|jpeg|png|webp|avif)
 */

export interface ScheduleItem {
  days: string;
  time: string;
}

export interface Modality {
  id: string;
  name: string;
  /** Nome curto do arquivo de imagem em src/assets/images/modalidades/. */
  imageKey: string;
  /** Categoria usada para filtros/segmentação de campanhas. */
  category: 'forca' | 'aulas-coletivas' | 'artes-marciais';
  categoryLabel: string;
  /** Rótulo complementar exibido ao lado do nome (ex.: "com kimono"). */
  note?: string;
  description?: string;
  schedule: ScheduleItem[];
  whatsappMessage: string;
  imageAlt: string;
}

export const MODALITIES: Modality[] = [
  {
    id: 'musculacao',
    name: 'Musculação',
    imageKey: 'musculacao',
    category: 'forca',
    categoryLabel: 'Força e condicionamento',
    description:
      'Treinamento de força para diferentes objetivos, com foco em condicionamento, desenvolvimento muscular e bem-estar.',
    schedule: [
      { days: 'Segunda a sexta-feira', time: '05h às 22h' },
      { days: 'Sábado', time: '07h às 14h' },
    ],
    whatsappMessage: MESSAGES.musculacao,
    imageAlt: 'Área de musculação da Apollo Body & Health',
  },
  {
    id: 'ritmos',
    name: 'Ritmos',
    imageKey: 'ritmos',
    category: 'aulas-coletivas',
    categoryLabel: 'Aulas coletivas',
    description: 'Aulas coletivas que unem música, movimento e energia.',
    schedule: [
      { days: 'Segunda-feira', time: '18h30' },
      { days: 'Quarta-feira', time: '19h30' },
    ],
    whatsappMessage: MESSAGES.modality('Ritmos'),
    imageAlt: 'Aula de Ritmos na Apollo Body & Health',
  },
  {
    id: 'boxe',
    name: 'Boxe',
    imageKey: 'boxe',
    category: 'artes-marciais',
    categoryLabel: 'Artes marciais',
    description:
      'Modalidade para quem busca desenvolver condicionamento físico, coordenação e habilidades de combate.',
    schedule: [{ days: 'Terças e quintas-feiras', time: '18h30' }],
    whatsappMessage: MESSAGES.modality('Boxe'),
    imageAlt: 'Aula de Boxe na Apollo Body & Health',
  },
  {
    id: 'jiu-jitsu-adulto',
    name: 'Jiu-Jitsu adulto',
    note: 'com kimono',
    imageKey: 'jiu-jitsu-adulto',
    category: 'artes-marciais',
    categoryLabel: 'Artes marciais',
    schedule: [
      { days: 'Segunda a sexta-feira', time: '20h30 às 22h' },
      { days: 'Segunda, quarta e sexta-feira', time: '09h30' },
      { days: 'Terças e quintas-feiras', time: '07h30' },
    ],
    whatsappMessage: MESSAGES.modality('Jiu-Jitsu adulto (com kimono)'),
    imageAlt: 'Aula de Jiu-Jitsu adulto com kimono na Apollo Body & Health',
  },
  {
    id: 'jiu-jitsu-no-gi',
    name: 'Jiu-Jitsu No-Gi',
    note: 'sem kimono',
    imageKey: 'jiu-jitsu-no-gi',
    category: 'artes-marciais',
    categoryLabel: 'Artes marciais',
    schedule: [{ days: 'Terças e quintas-feiras', time: '19h30 às 20h30' }],
    whatsappMessage: MESSAGES.modality('Jiu-Jitsu No-Gi (sem kimono)'),
    imageAlt: 'Aula de Jiu-Jitsu No-Gi na Apollo Body & Health',
  },
  {
    id: 'jiu-kids',
    name: 'Jiu-Kids',
    imageKey: 'jiu-kids',
    category: 'artes-marciais',
    categoryLabel: 'Artes marciais · Infantil',
    description:
      'Prática de Jiu-Jitsu voltada ao público infantil, com aprendizagem de técnicas e desenvolvimento de habilidades por meio da modalidade.',
    schedule: [{ days: 'Terças e quintas-feiras', time: '17h30' }],
    whatsappMessage: MESSAGES.modality('Jiu-Kids'),
    imageAlt: 'Aula de Jiu-Kids na Apollo Body & Health',
  },
];
