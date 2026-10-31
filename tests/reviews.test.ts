import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatReviewDate,
  initials,
  isEmbedSocialItemsUrl,
  parseWidgetDocument,
  selectReviews,
} from '../src/lib/reviews.ts';

const widgetHtml = `
window.averageRating = 4.8896103896103895;
window.numMaxMedia = 154;
window.paginationUrl = 'https://embedsocial.com/api/widget_items/195390/';
window.widgetMedia = '[{"id":"1","authorName":"Ana","caption":"Equipe atenciosa e ambiente acolhedor para treinar.","rating":5,"sourceType":"google","originalCreatedOn":"2026-08-01 10:00:00","profilePhotoUrl":"https://lh3.googleusercontent.com/a=s120","sourceLink":"https://maps.google.com/maps?cid=1"}]';
`;

test('Depoimentos: interpreta o widget público sem inventar campos', () => {
  const parsed = parseWidgetDocument(widgetHtml);
  assert.equal(parsed.averageRating, 4.8896103896103895);
  assert.equal(parsed.totalReviews, 154);
  assert.equal(isEmbedSocialItemsUrl(parsed.paginationUrl), true);
  assert.equal(parsed.media.length, 1);
  assert.equal(parsed.media[0]?.authorName, 'Ana');
});

test('Depoimentos: só aceita a paginação oficial do EmbedSocial', () => {
  assert.equal(isEmbedSocialItemsUrl('https://embedsocial.com/api/widget_items/195390/'), true);
  assert.equal(isEmbedSocialItemsUrl('https://embedsocial.com/api/widget_items/195390'), true);
  assert.equal(isEmbedSocialItemsUrl('http://embedsocial.com/api/widget_items/195390/'), false);
  assert.equal(isEmbedSocialItemsUrl('https://evil.example/api/widget_items/195390/'), false);
  assert.equal(isEmbedSocialItemsUrl('https://embedsocial.com/api/pro_hashtag/abc/'), false);
  assert.equal(isEmbedSocialItemsUrl(null), false);
});

test('Depoimentos: prioriza texto real sobre atendimento e descarta o que não veio da fonte', () => {
  const selected = selectReviews([
    {
      id: 'curto',
      authorName: 'Lia',
      caption: 'Excelente',
      rating: 5,
      sourceType: 'google',
      originalCreatedOn: '2026-10-01 00:00:00',
    },
    {
      id: 'relevante',
      authorName: 'Bruno',
      caption: 'Professores atenciosos e um ambiente acolhedor, com acompanhamento de verdade.',
      rating: 5,
      sourceType: 'google',
      originalCreatedOn: '2026-09-01 00:00:00',
      profilePhotoUrl: 'http://inseguro.example/foto.jpg',
      sourceLink: 'https://maps.google.com/maps?cid=99',
    },
    {
      id: 'equipe',
      authorName: 'Fred',
      caption: 'Que alegria fazer parte dessa historia. Abraço do seu amigo e professor Fred.',
      rating: 5,
      sourceType: 'google',
      originalCreatedOn: '2019-07-01 00:00:00',
    },
    {
      id: 'outra-fonte',
      authorName: 'Inventado',
      caption: 'Equipe maravilhosa e ambiente perfeito para qualquer pessoa treinar sempre.',
      rating: 5,
      sourceType: 'instagram',
      originalCreatedOn: '2026-10-02 00:00:00',
    },
  ]);

  assert.deepEqual(
    selected.map((review) => review.authorName),
    ['Bruno'],
  );
  assert.equal(selected[0]?.caption.includes('Professores atenciosos'), true);
  assert.equal(selected[0]?.profilePhotoUrl, null);
  assert.equal(selected[0]?.sourceLink, 'https://maps.google.com/maps?cid=99');
  assert.equal(selected.some((review) => review.authorName === 'Inventado'), false);
  assert.equal(selected.some((review) => review.authorName === 'Fred'), false);
});

test('Depoimentos: data e iniciais preservam o nome público', () => {
  assert.equal(formatReviewDate('2026-10-29 11:01:04'), '29 out. 2026');
  assert.equal(formatReviewDate('sem-data'), null);
  assert.equal(initials('mariana dourado'), 'MD');
  assert.equal(initials('Falando Verdades'), 'FV');
  assert.equal(initials('Analu Duarte (Analu)'), 'AD');
  assert.equal(initials('Deilan'), 'D');
});
