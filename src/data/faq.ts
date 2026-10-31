import { BLACK_FRIDAY } from '../config/site.ts';
import { JUDO } from './judo.ts';

/**
 * PERGUNTAS FREQUENTES
 * Respostas baseadas somente nas informações confirmadas. Quando depende de regras internas,
 * a resposta direciona para a equipe (`cta: true` exibe o botão de WhatsApp).
 */
export interface FaqItem {
  question: string;
  answer: string[];
  cta?: boolean;
}

const FAQ_BASE: FaqItem[] = [
  {
    question: 'Quais modalidades a Apollo oferece?',
    answer: [
      'A Apollo reúne musculação, aulas coletivas e artes marciais: Musculação, Ritmos, Boxe, Jiu-Jitsu adulto (com kimono), Jiu-Jitsu No-Gi (sem kimono) e Jiu-Kids. Também estamos formando novas turmas de Judô para crianças e adolescentes.',
    ],
  },
  {
    question: 'Quais são os horários da musculação?',
    answer: ['A musculação funciona de segunda a sexta-feira, das 05h às 22h, e aos sábados, das 07h às 14h.'],
  },
  {
    question: 'Como funcionam os planos mensal, semestral e anual?',
    answer: [
      'Temos três opções: Ouro Mensal (R$ 149,00 por mês, com taxa de matrícula de R$ 39,00), Ouro+ Semestral (R$ 720,00 em até 6 vezes no cartão, referência mensal de R$ 120,00) e Club+ Apollo (R$ 1.176,00 em até 12 vezes no cartão, referência mensal de R$ 98,00).',
      'Todas as modalidades estão incluídas nesses planos, exceto Jiu-Jitsu e Judô. Jiu-Jitsu e Judô possuem mensalidades independentes. Os benefícios de cada plano estão detalhados na seção Planos. Para condições de pagamento, regras de utilização e elegibilidade das modalidades, fale com a nossa equipe.',
    ],
    cta: true,
  },
  {
    question: 'O Jiu-Jitsu está incluído nos planos tradicionais da academia?',
    answer: [
      'Não. O Jiu-Jitsu possui mensalidade independente. O plano adulto custa R$ 206,00 por mês e o plano infantil custa R$ 166,00 por mês. Entre em contato com nossa equipe para consultar horários e condições de matrícula.',
    ],
    cta: true,
  },
  {
    question: 'A Apollo aceita Wellhub e TotalPass?',
    answer: [
      'Sim, a Apollo Body & Health aceita Wellhub e TotalPass. As condições de acesso, os planos elegíveis e a disponibilidade das modalidades devem ser consultados diretamente com a nossa equipe.',
    ],
    cta: true,
  },
  {
    question: 'Como faço para conhecer a academia?',
    answer: [
      'Fale com a nossa equipe pelo WhatsApp e combine sua visita. Você também pode abrir a localização da Apollo no Google Maps e ver como chegar.',
    ],
    cta: true,
  },
  {
    question: 'Como funcionam as novas turmas de Judô?',
    answer: [
      `Estamos formando duas turmas de Judô para crianças e adolescentes, às terças e quintas-feiras: Turma 1, das 08h às 09h, e Turma 2, das 16h às 17h. A faixa etária atendida está em confirmação e as vagas devem ser consultadas com a equipe.`,
    ],
    cta: true,
  },
  {
    question: 'O Judô está incluído nos planos tradicionais?',
    answer: ['Não. O Judô possui contratação independente, com mensalidade de R$ 166,00.'],
  },
  {
    question: 'Qual é o valor mensal do Judô?',
    answer: [
      `A mensalidade do Judô para crianças e adolescentes é de ${JUDO.price} por mês. A contratação é independente dos planos tradicionais da academia.`,
    ],
  },
  {
    question: 'Como posso obter informações sobre matrícula?',
    answer: [
      'Chame a equipe da Apollo pelo WhatsApp. Ela vai orientar sobre o processo de matrícula, a escolha do plano e as condições vigentes.',
    ],
    cta: true,
  },
  {
    question: 'Como posso consultar os horários das aulas de artes marciais?',
    answer: [
      'Os horários de Boxe, Jiu-Jitsu adulto, Jiu-Jitsu No-Gi, Jiu-Kids e das novas turmas de Judô estão na seção Horários desta página. Para confirmar turmas e vagas, fale com a nossa equipe.',
    ],
    cta: true,
  },
];

const promoFaq: FaqItem[] = BLACK_FRIDAY.enabled
  ? BLACK_FRIDAY.faq.map((item) => ({ question: item.question, answer: [item.answer] }))
  : [];

const plansIndex = FAQ_BASE.findIndex((item) => item.question.startsWith('Como funcionam os planos'));
const promoAt = plansIndex === -1 ? FAQ_BASE.length : plansIndex + 1;

/** Perguntas permanentes, com a Black Friday inserida só enquanto a campanha estiver ligada. */
export const FAQ: FaqItem[] = [
  ...FAQ_BASE.slice(0, promoAt),
  ...promoFaq,
  ...FAQ_BASE.slice(promoAt),
];
