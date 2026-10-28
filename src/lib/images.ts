import type { ImageMetadata } from 'astro';

/**
 * RESOLUÇÃO DE IMAGENS
 * ------------------------------------------------------------------
 * Todas as imagens ficam em src/assets/images/<pasta>/<nome>.(jpg|jpeg|png|webp|avif|svg)
 * e são otimizadas automaticamente no build (AVIF/WebP, tamanhos responsivos, width/height).
 *
 * Para trocar uma foto provisória pela real, basta salvar o arquivo com o nome esperado
 * na pasta correspondente (ex.: src/assets/images/modalidades/boxe.jpg). A foto real tem
 * sempre prioridade sobre a provisória. Veja README.md.
 */

const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,svg}',
  { eager: true },
);

export type ImageFolder =
  | 'hero'
  | 'academia'
  | 'modalidades'
  | 'judo'
  | 'equipe'
  | 'video'
  | 'brand'
  | 'provisorias';

export interface ResolvedImage {
  image: ImageMetadata;
  /** true quando for uma imagem provisória (não é registro real da Apollo). */
  provisional: boolean;
}

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg'];

function find(folder: ImageFolder, name: string): ImageMetadata | undefined {
  for (const ext of EXTENSIONS) {
    const mod = modules[`/src/assets/images/${folder}/${name}.${ext}`];
    if (mod) return mod.default;
  }
  return undefined;
}

/**
 * Procura a foto real (`folder/name`); se não existir, usa a provisória (`provisorias/fallback`).
 * Retorna `undefined` quando nenhuma das duas existe (o componente exibe um placeholder elegante).
 */
export function resolveImage(
  folder: ImageFolder,
  name: string,
  provisionalName?: string,
): ResolvedImage | undefined {
  const real = find(folder, name);
  if (real) return { image: real, provisional: false };
  if (provisionalName) {
    const fallback = find('provisorias', provisionalName);
    if (fallback) return { image: fallback, provisional: true };
  }
  return undefined;
}
