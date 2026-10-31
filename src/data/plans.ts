/**
 * PLANOS E INVESTIMENTO
 * Valores e benefícios conforme a arte oficial. Para atualizar, edite apenas este arquivo.
 * Não adicionar descontos, promoções, taxas ou regras contratuais não confirmadas.
 */

export interface Plan {
  id: string;
  name: string;
  /** Nome usado na mensagem de WhatsApp. */
  whatsappName: string;
  tagline: string;
  featured?: boolean;
  badge?: string;
  /** Valor principal em destaque. */
  price: string;
  priceSuffix?: string;
  /** Linhas secundárias de valor/pagamento. */
  priceDetails: string[];
  features: string[];
  cta: string;
}

export const PLANS: Plan[] = [
  {
    id: 'ouro-mensal',
    name: 'Ouro Mensal',
    whatsappName: 'Ouro Mensal',
    tagline: 'Flexibilidade para começar no seu ritmo.',
    price: 'R$ 149,00',
    priceSuffix: 'por mês',
    priceDetails: [],
    features: [
      'Acesso às modalidades incluídas no plano',
      'Taxa de matrícula: R$ 39,00',
      'Convite de 7 dias todo mês',
    ],
    cta: 'Consultar o plano mensal',
  },
  {
    id: 'ouro-plus-semestral',
    name: 'Ouro+ Semestral',
    whatsappName: 'Ouro+ Semestral',
    tagline: 'Um semestre de treino com mais benefícios.',
    price: 'R$ 720,00',
    priceSuffix: 'valor total',
    priceDetails: ['Pagamento em até 6 vezes no cartão', 'Referência mensal: R$ 120,00'],
    features: [
      'Acesso às modalidades incluídas no plano',
      'Taxa de matrícula diferenciada',
      '1 convite de 15 dias todo mês',
      '1 avaliação física gratuita',
      'Tranque: mínimo de 15 e máximo de 30 dias',
    ],
    cta: 'Quero o plano semestral',
  },
  {
    id: 'club-plus-apollo',
    name: 'Club+ Apollo',
    whatsappName: 'Club+ Apollo',
    tagline: 'Para quem quer uma jornada de longo prazo.',
    featured: true,
    badge: 'Jornada de longo prazo',
    price: 'R$ 1.176,00',
    priceSuffix: 'valor total',
    priceDetails: ['Pagamento em até 12 vezes no cartão', 'Referência mensal: R$ 98,00'],
    features: [
      'Acesso às modalidades incluídas no plano',
      'Taxa de matrícula gratuita',
      '1 convite de 30 dias todo mês',
      '4 avaliações físicas gratuitas',
      'Tranque: mínimo de 30 e máximo de 90 dias',
      'Transferência de matrícula',
    ],
    cta: 'Quero conhecer o Club+',
  },
];

/** Observação permanente, exibida em cada plano tradicional. Judô e Jiu-Jitsu ficam de fora. */
export const PLAN_EXCLUSION_NOTE =
  'Todas as modalidades incluídas, exceto Jiu-Jitsu e Judô. Jiu-Jitsu e Judô possuem mensalidades independentes.';

/**
 * JIU-JITSU APOLLO — mensalidades independentes, fora dos planos tradicionais.
 * Não adicionar benefícios, descontos, taxas de matrícula ou condições de pagamento não confirmadas.
 */
export interface JiuJitsuPlan {
  id: string;
  name: string;
  icon: 'belt' | 'baby';
  price: string;
  priceSuffix: string;
  description: string;
  cta: string;
  /** Nome usado no rastreamento do clique. */
  trackingItem: string;
  whatsappMessage: string;
}

export const JIU_JITSU_SECTION = {
  title: 'JIU-JITSU APOLLO',
  subtitle: 'Treinamento de artes marciais com planos próprios para adultos e crianças.',
  highlight: 'O Jiu-Jitsu possui mensalidade independente e não está incluído nos planos tradicionais da academia.',
} as const;

export const JIU_JITSU_PLANS: JiuJitsuPlan[] = [
  {
    id: 'jiu-jitsu-adulto',
    name: 'Jiu-Jitsu Adulto',
    icon: 'belt',
    price: 'R$ 206,00',
    priceSuffix: 'mensalidade',
    description: 'Treinamento de Jiu-Jitsu para o público adulto, com aulas conforme os horários da modalidade.',
    cta: 'Tenho interesse no Jiu-Jitsu Adulto',
    trackingItem: 'Jiu-Jitsu Adulto',
    whatsappMessage:
      'Olá! Tenho interesse no plano de Jiu-Jitsu adulto da Apollo Body & Health, no valor de R$ 206,00 mensais. Gostaria de receber informações sobre horários e matrícula.',
  },
  {
    id: 'jiu-jitsu-infantil',
    name: 'Jiu-Jitsu Infantil',
    icon: 'baby',
    price: 'R$ 166,00',
    priceSuffix: 'mensalidade',
    description: 'Jiu-Jitsu infantil para crianças interessadas em conhecer e praticar a modalidade.',
    cta: 'Tenho interesse no Jiu-Jitsu Infantil',
    trackingItem: 'Jiu-Jitsu Infantil',
    whatsappMessage:
      'Olá! Tenho interesse no plano de Jiu-Jitsu infantil da Apollo Body & Health, no valor de R$ 166,00 mensais. Gostaria de receber informações sobre horários, faixa etária e matrícula.',
  },
];

export const PLANS_NOTE =
  'Consulte a equipe para conhecer as condições de pagamento, regras de utilização, elegibilidade das modalidades e condições de cada plano.';
