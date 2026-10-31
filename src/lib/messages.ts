/** Mensagens pré-preenchidas de WhatsApp, por origem do clique. */
export const MESSAGES = {
  general:
    'Olá! Conheci a Apollo Body & Health pelo site e gostaria de receber informações sobre a academia e como realizar uma visita.',
  /** Topo da página e chamadas discretas da jornada até os planos. */
  heroPlans:
    'Olá! Conheci a Apollo pelo site e gostaria de conhecer os planos e saber como garantir minha vaga.',
  musculacao:
    'Olá! Tenho interesse em conhecer a musculação da Apollo Body & Health. Poderiam me informar como funciona a matrícula?',
  plans:
    'Olá! Gostaria de conhecer melhor os planos da Apollo Body & Health e entender qual opção combina com minha rotina.',
  judo:
    'Olá! Vi a página da Apollo Body & Health e tenho interesse nas novas turmas de Judô para crianças e adolescentes. Gostaria de saber sobre as vagas, a faixa etária atendida e como realizar a matrícula.',
  benefit:
    'Olá! Gostaria de saber como funciona o acesso à Apollo Body & Health pelo Wellhub ou TotalPass e quais modalidades estão disponíveis para meu plano.',
  location:
    'Olá! Gostaria de conhecer a Apollo Body & Health e de receber orientações para chegar até a academia.',
  /** Mensagem para uma modalidade específica. */
  modality: (name: string) =>
    `Olá! Vi a página da Apollo Body & Health e tenho interesse na modalidade ${name}. Poderiam me passar mais informações sobre horários e como começar?`,
  /** Mensagem para um plano específico. */
  plan: (name: string) =>
    `Olá! Tenho interesse no plano ${name} da Apollo Body & Health. Poderiam me explicar as condições e como realizar a matrícula?`,
} as const;
