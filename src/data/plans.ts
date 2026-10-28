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
      'Acesso a todas as modalidades',
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
      'Acesso a todas as modalidades',
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
      'Acesso a todas as modalidades',
      'Taxa de matrícula gratuita',
      '1 convite de 30 dias todo mês',
      '4 avaliações físicas gratuitas',
      'Tranque: mínimo de 30 e máximo de 90 dias',
      'Transferência de matrícula',
    ],
    cta: 'Quero conhecer o Club+',
  },
];

export const PLANS_NOTE =
  'Consulte a equipe para conhecer as condições de pagamento, regras de utilização, elegibilidade das modalidades e condições de cada plano.';
