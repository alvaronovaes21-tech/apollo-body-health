import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppLink } from '../src/lib/whatsapp.ts';
import { MESSAGES } from '../src/lib/messages.ts';
import { eventsFromDataset, EVENTS } from '../src/lib/tracking-events.ts';
import { MODALITIES } from '../src/data/modalities.ts';
import { PLANS } from '../src/data/plans.ts';
import { JUDO } from '../src/data/judo.ts';
import { FAQ } from '../src/data/faq.ts';
import { CONTACT, LOCATION, ANALYTICS, YOUTUBE_VIDEO_ID } from '../src/config/site.ts';

test('WhatsApp: número internacional e codificação da mensagem', () => {
  assert.equal(CONTACT.whatsappNumber, '5571999076612');
  const url = new URL(buildWhatsAppLink('Olá! Quero saber mais & conhecer.'));
  assert.equal(url.origin + url.pathname, 'https://wa.me/5571999076612');
  assert.equal(url.searchParams.get('text'), 'Olá! Quero saber mais & conhecer.');
  assert.equal(buildWhatsAppLink(), 'https://wa.me/5571999076612');
  assert.equal(buildWhatsAppLink('  '), 'https://wa.me/5571999076612');
});

test('WhatsApp: mensagem do Judô é exatamente a definida', () => {
  assert.equal(
    JUDO.whatsappMessage,
    'Olá! Vi a página da Apollo Body & Health e tenho interesse nas novas turmas de Judô para crianças e adolescentes. Gostaria de saber sobre as vagas, a faixa etária atendida e como realizar a matrícula.',
  );
  assert.equal(new URL(buildWhatsAppLink(MESSAGES.judo)).searchParams.get('text'), MESSAGES.judo);
});

test('Modalidades: horários exatamente como fornecidos', () => {
  const byId = Object.fromEntries(MODALITIES.map((m) => [m.id, m.schedule.map((s) => `${s.days}|${s.time}`)]));
  assert.deepEqual(byId['musculacao'], ['Segunda a sexta-feira|05h às 22h', 'Sábado|07h às 14h']);
  assert.deepEqual(byId['ritmos'], ['Segunda-feira|18h30', 'Quarta-feira|19h30']);
  assert.deepEqual(byId['boxe'], ['Terças e quintas-feiras|18h30']);
  assert.deepEqual(byId['jiu-jitsu-adulto'], [
    'Segunda a sexta-feira|20h30 às 22h',
    'Segunda, quarta e sexta-feira|09h30',
    'Terças e quintas-feiras|07h30',
  ]);
  assert.deepEqual(byId['jiu-jitsu-no-gi'], ['Terças e quintas-feiras|19h30 às 20h30']);
  assert.deepEqual(byId['jiu-kids'], ['Terças e quintas-feiras|17h30']);
  assert.equal(MODALITIES.length, 6);
  for (const m of MODALITIES) {
    assert.ok(m.whatsappMessage.includes('Apollo Body & Health'));
  }
});

test('Judô: turmas, dias e mensalidade; faixa etária não inventada', () => {
  assert.equal(JUDO.price, 'R$ 166,00');
  assert.equal(JUDO.days, 'Terças e quintas-feiras');
  assert.deepEqual(
    JUDO.classes.map((c) => c.time),
    ['Das 08h às 09h', 'Das 16h às 17h'],
  );
  assert.equal(JUDO.ageRange, '');
});

test('Planos: valores e benefícios conforme a arte oficial', () => {
  const [mensal, semestral, club] = PLANS;
  assert.equal(mensal.price, 'R$ 149,00');
  assert.ok(mensal.features.includes('Taxa de matrícula: R$ 39,00'));
  assert.ok(mensal.features.includes('Convite de 7 dias todo mês'));
  assert.equal(semestral.price, 'R$ 720,00');
  assert.ok(semestral.priceDetails.some((d) => d.includes('6 vezes')));
  assert.ok(semestral.priceDetails.some((d) => d.includes('R$ 120,00')));
  assert.ok(semestral.features.includes('Tranque: mínimo de 15 e máximo de 30 dias'));
  assert.equal(club.price, 'R$ 1.176,00');
  assert.ok(club.priceDetails.some((d) => d.includes('12 vezes')));
  assert.ok(club.priceDetails.some((d) => d.includes('R$ 98,00')));
  assert.ok(club.features.includes('Taxa de matrícula gratuita'));
  assert.ok(club.features.includes('4 avaliações físicas gratuitas'));
  assert.ok(club.features.includes('Transferência de matrícula'));
  assert.equal(PLANS.length, 3);
});

test('Localização e vídeo: link oficial; vídeo vazio por padrão', () => {
  assert.equal(LOCATION.mapsUrl, 'https://maps.app.goo.gl/3HAEsdgrbMUy8EJZ6');
  assert.equal(LOCATION.address, '');
  assert.equal(YOUTUBE_VIDEO_ID, '');
});

test('Mensuração: sem IDs inventados', () => {
  assert.equal(ANALYTICS.gtmId, '');
  assert.equal(ANALYTICS.ga4Id, '');
  assert.equal(ANALYTICS.googleAdsId, '');
});

test('Eventos: um único evento primário por clique, sem duplicar', () => {
  const modality = eventsFromDataset({ track: 'whatsapp', origin: 'modalidades', category: 'modality', item: 'Boxe' });
  assert.deepEqual(
    modality.map((e) => e.name),
    [EVENTS.WHATSAPP_CLICK, EVENTS.CONTACT_MODALITY],
  );
  assert.equal(modality[0].params.content_name, 'Boxe');

  const general = eventsFromDataset({ track: 'whatsapp', origin: 'hero', category: 'general' });
  assert.deepEqual(general.map((e) => e.name), [EVENTS.WHATSAPP_CLICK]);

  assert.deepEqual(
    eventsFromDataset({ track: 'whatsapp', origin: 'planos', category: 'plan', item: 'Club+ Apollo' }).map((e) => e.name),
    [EVENTS.WHATSAPP_CLICK, EVENTS.CONTACT_PLAN],
  );
  assert.deepEqual(
    eventsFromDataset({ track: 'whatsapp', origin: 'judo', category: 'judo' }).map((e) => e.name),
    [EVENTS.WHATSAPP_CLICK, EVENTS.CONTACT_JUDO],
  );
  assert.deepEqual(eventsFromDataset({ track: 'maps', origin: 'footer' }).map((e) => e.name), [EVENTS.MAPS_CLICK]);
  assert.deepEqual(eventsFromDataset({}), []);
  // Nenhum evento representa matrícula concluída
  for (const name of Object.values(EVENTS)) assert.ok(!/enrol|matricula|purchase/i.test(name));
});

test('FAQ: 9 perguntas e valor do Judô coerente', () => {
  assert.equal(FAQ.length, 9);
  const judoPrice = FAQ.find((f) => f.question.includes('valor mensal do Judô'));
  assert.ok(judoPrice?.answer[0].includes('R$ 166,00'));
});
