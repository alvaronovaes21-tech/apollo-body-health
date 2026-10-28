# Mensuração e conversões (Google Tag Manager, GA4 e Google Ads)

A página já está preparada para mensuração, **sem nenhum ID embutido**. Nada é carregado até que você
preencha as variáveis no `.env` (veja `.env.example`). Sem IDs, a página funciona normalmente.

## Como ativar

1. **Recomendado:** crie um contêiner no Google Tag Manager e defina `PUBLIC_GTM_ID=GTM-XXXXXXX`.
   O GTM passa a gerenciar GA4 e Google Ads; os eventos abaixo chegam ao `dataLayer`.
2. **Alternativa sem GTM:** defina `PUBLIC_GA4_ID` e/ou `PUBLIC_GOOGLE_ADS_ID`. A página carrega o `gtag.js` e envia
   os eventos com `gtag('event', ...)`. Se `PUBLIC_GTM_ID` estiver definido, os IDs diretos são ignorados (evita contagem dupla).
3. Rode `npm run build` e publique.

Para conferir os eventos sem GTM, abra a página com `?apollo_debug=1` (ou `localStorage.apollo_debug = '1'`) e
veja o console do navegador: cada evento é impresso como `[apollo:event]`.

## Eventos

Todos os eventos representam **intenção de contato**. Nenhum deles significa matrícula concluída.

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `whatsapp_click` | **Qualquer** clique em botão/link de WhatsApp (cabeçalho, hero, modalidades, planos, Judô, benefício, FAQ, rodapé, botão flutuante, CTA final) | `click_origin`, `click_category`, `content_name` (quando houver) |
| `contact_modality_click` | Clique em "Consultar esta modalidade" | idem |
| `contact_plan_click` | Clique nos botões dos planos | idem (`content_name` = nome do plano) |
| `contact_judo_click` | Clique no CTA do Judô | idem |
| `contact_benefit_click` | Clique em "Consultar acesso pelo meu benefício" (Wellhub/TotalPass) | idem |
| `maps_click` | Clique em "Ver localização no Google Maps", "Como chegar", cartão do mapa, CTA final ou rodapé | `click_origin`, `click_category` |
| `video_play` | Primeira reprodução do vídeo de apresentação (só existe quando o ID do YouTube está configurado) | `video_id`, `click_origin` |

Valores de `click_origin` (onde o clique ocorreu): `header`, `header-menu-mobile`, `hero`, `modalidades`, `judo`,
`planos`, `planos-geral`, `beneficio`, `horarios`, `localizacao`, `localizacao-cartao`, `faq-1` … `faq-9`, `cta-final`,
`footer`, `botao-flutuante`. Valores de `click_category`: `general`, `modality`, `plan`, `judo`, `benefit`, `faq`,
`location`, `ver-localizacao`, `como-chegar`.

### Como evitar contagem duplicada

Cada clique em WhatsApp gera **dois eventos**: o genérico `whatsapp_click` e, quando aplicável, um específico
(`contact_*_click`). Por isso:

- Use **apenas `whatsapp_click`** como conversão **principal** no Google Ads.
- Use `contact_modality_click`, `contact_plan_click`, `contact_judo_click` e `contact_benefit_click` somente como
  **conversões secundárias** (ação "Secundária", fora de "Meta") ou como eventos de análise/público no GA4. Se você
  marcar todos como principais, o mesmo clique será contado mais de uma vez.
- Os eventos são enviados por um único ponto (`window.apolloTrack`) e um único listener de clique; não há disparo duplo.

## O que configurar no Google Ads

| Ação de conversão | Evento de origem | Tipo sugerido |
|---|---|---|
| Contato por WhatsApp (intenção) | `whatsapp_click` | **Principal** (contato/lead) |
| Contato — modalidade | `contact_modality_click` | Secundária |
| Contato — planos | `contact_plan_click` | Secundária |
| Contato — Judô | `contact_judo_click` | Secundária (útil para a campanha de Judô) |
| Contato — Wellhub/TotalPass | `contact_benefit_click` | Secundária |
| Localização no Maps | `maps_click` | Secundária (ou apenas observação) |
| Reprodução do vídeo | `video_play` | Apenas observação (não é conversão) |

Sugestão para campanhas segmentadas: para a campanha de Judô, use `contact_judo_click` como conversão principal
**dessa** campanha (e mantenha `whatsapp_click` como principal nas demais), definindo os objetivos por campanha para
não contar o mesmo clique duas vezes na mesma campanha.

> Importante: cliques no WhatsApp **não** são matrículas. Para medir matrículas reais, importe conversões offline
> (por exemplo, a partir de `gclid`) com os dados da recepção/CRM, em uma ação separada.

### Configuração no GTM

1. Crie variáveis de camada de dados: `click_origin`, `click_category`, `content_name`, `video_id`.
2. Crie acionadores do tipo **Evento personalizado** para cada evento da tabela.
3. Crie uma tag **GA4 Event** (com o nome do evento) e, para conversões, a tag **Google Ads Conversion Tracking**
   (ID e rótulo fornecidos pelo Google Ads) usando o acionador `whatsapp_click`.
4. Teste com o modo de visualização do GTM e publique.

## Consent Mode v2

Com `PUBLIC_CONSENT_MODE=true`, a página define, **antes de carregar qualquer tag**, o padrão:
`ad_storage`, `ad_user_data`, `ad_personalization` e `analytics_storage` = `denied`.

A página **não inclui um banner de cookies** (para não criar pop-ups intrusivos nem textos jurídicos inventados).
Ao integrar sua ferramenta de consentimento (CMP) ou um banner próprio, chame:

```js
window.apolloConsent.grant();   // concede todas as finalidades
window.apolloConsent.deny();    // nega todas
window.apolloConsent.update({ analytics_storage: 'granted', ad_storage: 'denied' }); // granular
```

Defina também `PUBLIC_PRIVACY_URL` e `PUBLIC_COOKIES_URL` quando as páginas existirem; os links aparecem
automaticamente no rodapé. A configuração de consentimento deve seguir a LGPD e os requisitos aplicáveis ao seu caso
(recomenda-se validação jurídica).
