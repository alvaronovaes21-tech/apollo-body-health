# Apollo Body & Health — Landing Page

Landing page da Academia Apollo Body & Health (Salvador, BA), pensada para campanhas do Google Ads e
para gerar contatos pelo WhatsApp. Feita com [Astro](https://astro.build) (site estático, rápido, quase
sem JavaScript no cliente) e TypeScript.

## Como executar localmente

Pré-requisito: Node.js 20 ou superior.

```bash
npm install          # instala as dependências
npm run dev          # servidor de desenvolvimento em http://localhost:4321
npm test             # testes automatizados (dados, WhatsApp, eventos)
npm run build        # verificação de tipos (astro check) + build de produção em /dist
npm run preview      # serve o build de produção localmente
npm run og           # regenera public/og-image.jpg (imagem de compartilhamento)
```

Publicação: o site é publicado automaticamente no GitHub Pages a cada push na branch `main`
(workflow `.github/workflows/deploy.yml`) no domínio próprio https://www.academiaapollo.com.br
(configurado em `public/CNAME` e no workflow com `PUBLIC_BASE_PATH=/`).

O `base` do Astro é `/apollo-body-health/` por padrão (por isso o `npm run dev` local responde em
`http://localhost:4321/apollo-body-health/`). Para publicar em outra hospedagem estática ou em domínio próprio
na raiz, faça o build com `PUBLIC_BASE_PATH=/` e `PUBLIC_SITE_URL=https://seudominio.com.br`
e envie o conteúdo de `dist/`.

## Onde alterar cada coisa

| O que | Onde |
|---|---|
| Telefone/WhatsApp, link do Google Maps, endereço (quando confirmado), ID do vídeo | `src/config/site.ts` |
| Planos, preços e benefícios | `src/data/plans.ts` |
| Modalidades e horários | `src/data/modalities.ts` |
| Judô (turmas, horários, mensalidade, faixa etária) | `src/data/judo.ts` |
| Perguntas frequentes | `src/data/faq.ts` |
| Itens da galeria | `src/data/gallery.ts` |
| Mensagens pré-preenchidas do WhatsApp | `src/lib/messages.ts` |
| Função que gera links de WhatsApp | `src/lib/whatsapp.ts` |
| Menu | `src/data/navigation.ts` |
| Cores e fontes | `src/styles/global.css` (variáveis `:root`) |

### Variáveis de ambiente (`.env`)

Copie `.env.example` para `.env` e preencha apenas o que estiver confirmado. Todas são opcionais:
a página funciona normalmente sem elas.

| Variável | Para quê |
|---|---|
| `PUBLIC_SITE_URL` | URL final do site, incluindo o caminho base se houver (canonical, Open Graph, sitemap, dados estruturados) |
| `PUBLIC_BASE_PATH` | Caminho base do deploy. Padrão `/apollo-body-health/`; use `/` em domínio próprio |
| `PUBLIC_GTM_ID` | Google Tag Manager (`GTM-XXXXXXX`) |
| `PUBLIC_GA4_ID` | GA4 direto (`G-XXXXXXXXXX`) — só se não usar GTM |
| `PUBLIC_GOOGLE_ADS_ID` | Google Ads direto (`AW-XXXXXXXXX`) — só se não usar GTM |
| `PUBLIC_CONSENT_MODE` | `true` inicia o Consent Mode v2 com consentimento negado |
| `PUBLIC_YOUTUBE_VIDEO_ID` | ID do vídeo de apresentação |
| `PUBLIC_INSTAGRAM_URL` | Perfil oficial do Instagram |
| `PUBLIC_PRIVACY_URL` / `PUBLIC_COOKIES_URL` | Páginas legais (os links só aparecem se preenchidos) |

## Como substituir as imagens provisórias

As imagens ficam em `src/assets/images/` e são otimizadas automaticamente no build (AVIF/WebP, vários
tamanhos, `width`/`height` para evitar saltos de layout, lazy loading). **Basta salvar a foto real
com o nome esperado na pasta correta e rodar o build**: a foto real sempre tem prioridade sobre a provisória.
Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.

| Pasta | Arquivo(s) esperado(s) | Onde aparece |
|---|---|---|
| `src/assets/images/brand/` | `logo-apollo.svg` ou `.png` | Logomarca oficial (cabeçalho e rodapé) |
| `src/assets/images/hero/` | `hero.jpg` | Fundo da primeira tela (recomendado ≥ 2000 px de largura) |
| `src/assets/images/modalidades/` | `musculacao`, `ritmos`, `boxe`, `jiu-jitsu-adulto`, `jiu-jitsu-no-gi`, `jiu-kids` | Cards de modalidades (proporção 16:10) |
| `src/assets/images/judo/` | `judo.jpg` | Bloco de destaque do Judô (vertical, 4:5) |
| `src/assets/images/academia/` | `fachada`, `recepcao`, `musculacao`, `equipamentos`, `aulas-coletivas`, `artes-marciais`, `ambiente` | Galeria "Conheça nosso espaço" (proporção 4:3) |
| `src/assets/images/equipe/` | `professores` | Galeria — requer autorização de uso de imagem |
| `src/assets/images/video/` | `capa.jpg` | Capa do vídeo (16:9) |
| `src/assets/images/provisorias/` | — | Imagens provisórias usadas até existir foto real |

Observações:

- **Logomarca:** a página **não recria** o símbolo "A". Enquanto o arquivo oficial não for salvo em
  `brand/logo-apollo.*`, o cabeçalho mostra apenas o nome da marca em texto. O arquivo é exibido sem recorte
  e mantendo a proporção. Também substitua `public/favicon.svg` pelo símbolo oficial (o atual é neutro e provisório).
- **Galeria:** cada espaço sem foto mostra o aviso "Foto real em breve". Assim que a foto existe, o espaço passa a
  abrir em visualização ampliada (teclado: setas e Esc). Para mudar legendas e textos alternativos, edite `src/data/gallery.ts`.
- **Imagens provisórias** (`provisorias/`): fotos de banco de imagens (Unsplash License), exibidas com o selo
  "Imagem ilustrativa". Não representam a Apollo. Sempre guarde o original das suas fotos antes de otimizar.
  A foto provisória do hero contém a marca visível "ROGUE" (anilhas); troque-a pela foto real o quanto antes.
- **Imagem de compartilhamento:** após adicionar `hero/hero.jpg`, rode `npm run og` para regenerar `public/og-image.jpg`.
- **Wellhub e TotalPass:** os nomes aparecem em texto. Para exibir logotipos, use apenas arquivos oficiais/autorizados
  fornecidos pelas plataformas e adapte `src/components/Benefits.astro`.

## Vídeo do YouTube

Defina o ID (somente o código, ex.: `abc123XYZ_-`) em **`PUBLIC_YOUTUBE_VIDEO_ID`** no `.env`
(ou diretamente em `YOUTUBE_VIDEO_ID`, em `src/config/site.ts`). Enquanto estiver vazio, a seção mostra a capa
provisória com o aviso "O vídeo de apresentação será disponibilizado em breve" (sem player quebrado). Com o ID
preenchido, aparece a capa com botão de reprodução; o player (youtube-nocookie) só é carregado após o clique e o
evento `video_play` é registrado. Componente reutilizável: `src/components/YouTubeVideo.astro`.

## Mapa incorporado

O botão e o link do Google Maps usam o link oficial. Para exibir um mapa incorporado, copie o `src` do iframe
em Google Maps → Compartilhar → Incorporar um mapa e cole em `LOCATION.embedUrl` (`src/config/site.ts`).

## Mensuração (GTM, GA4, Google Ads)

Veja **[docs/MENSURACAO.md](docs/MENSURACAO.md)**: eventos, parâmetros, o que configurar como conversão e Consent Mode.

## SEO

- Título, descrição, Open Graph e Twitter Card em `src/config/site.ts` / `src/layouts/Layout.astro`.
- Canonical, `sitemap.xml` e `robots.txt` são gerados a partir de `PUBLIC_SITE_URL`.
- Dados estruturados (`ExerciseGym` + `FAQPage`) usam somente dados verificados: nome, cidade/UF, telefone e link do Maps.
  Quando o endereço for confirmado, preencha `LOCATION.address` e ele será incluído automaticamente.
- Sem `PUBLIC_SITE_URL`, o canonical é omitido e o sitemap fica sem entradas (nenhuma URL é inventada).

## Informações que ainda precisam ser confirmadas

- Logomarca oficial em arquivo (SVG/PNG) e símbolo para o favicon.
- Endereço completo e bairro (`LOCATION.address` / `LOCATION.neighborhood`).
- Perfil oficial do Instagram (`PUBLIC_INSTAGRAM_URL`).
- ID do vídeo do YouTube (`PUBLIC_YOUTUBE_VIDEO_ID`).
- IDs do GTM, GA4 e Google Ads, e a política de consentimento adotada.
- Fotografias reais (hero, modalidades, Judô, galeria, vídeo) e autorização de imagem dos professores.
- Faixa etária exata das turmas de Judô (`JUDO.ageRange`).
- Regras de matrícula e de acesso às modalidades via Wellhub/TotalPass.
- Páginas de política de privacidade e aviso de cookies (URLs em `.env`), caso a mensuração seja ativada.
- URL final do site (`PUBLIC_SITE_URL`).

## Estrutura do projeto

```
src/
  config/site.ts        Configuração central (telefone, Maps, vídeo, integrações)
  data/                 Planos, modalidades, Judô, FAQ, galeria, navegação
  lib/                  WhatsApp, mensagens, imagens, catálogo de eventos
  components/           Seções e peças reutilizáveis
  scripts/              Rastreamento de eventos e comportamento de interface
  layouts/Layout.astro  <head>, SEO, dados estruturados e scripts
  pages/                index, robots.txt, sitemap.xml
  assets/images/        Imagens (reais e provisórias)
tests/                  Testes automatizados
docs/MENSURACAO.md      Eventos e configuração do Google
```
