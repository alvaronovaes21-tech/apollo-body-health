import type { ImageFolder } from '../lib/images.ts';

/**
 * GALERIA "CONHEÇA NOSSO ESPAÇO"
 * Cada item é um espaço reservado para uma foto REAL da Apollo.
 * Para preencher: salve a foto em src/assets/images/<folder>/<name>.jpg (ou png/webp/avif).
 * Não use imagens de terceiros ou geradas como se fossem registros reais da academia.
 * Fotos com pessoas (professores/alunos) exigem autorização de uso de imagem.
 */
export interface GalleryItem {
  id: string;
  folder: ImageFolder;
  name: string;
  label: string;
  alt: string;
  /** Legenda opcional exibida no modo ampliado. */
  caption?: string;
}

export const GALLERY: GalleryItem[] = [
  {
    id: 'fachada',
    folder: 'academia',
    name: 'fachada',
    label: 'Fachada e entrada',
    alt: 'Fachada e entrada da Apollo Body & Health',
    caption: 'Fachada e entrada',
  },
  {
    id: 'recepcao',
    folder: 'academia',
    name: 'recepcao',
    label: 'Recepção',
    alt: 'Recepção da Apollo Body & Health',
    caption: 'Recepção',
  },
  {
    id: 'musculacao',
    folder: 'academia',
    name: 'musculacao',
    label: 'Área de musculação',
    alt: 'Área de musculação da Apollo Body & Health',
    caption: 'Área de musculação',
  },
  {
    id: 'equipamentos',
    folder: 'academia',
    name: 'equipamentos',
    label: 'Equipamentos',
    alt: 'Equipamentos de treino da Apollo Body & Health',
    caption: 'Equipamentos',
  },
  {
    id: 'aulas-coletivas',
    folder: 'academia',
    name: 'aulas-coletivas',
    label: 'Espaço para aulas coletivas',
    alt: 'Espaço para aulas coletivas da Apollo Body & Health',
    caption: 'Espaço para aulas coletivas',
  },
  {
    id: 'artes-marciais',
    folder: 'academia',
    name: 'artes-marciais',
    label: 'Área de artes marciais',
    alt: 'Área de artes marciais da Apollo Body & Health',
    caption: 'Área de artes marciais',
  },
  {
    id: 'ambiente',
    folder: 'academia',
    name: 'ambiente',
    label: 'Ambiente geral',
    alt: 'Ambiente geral da Apollo Body & Health',
    caption: 'Ambiente geral',
  },
  {
    id: 'professores',
    folder: 'equipe',
    name: 'professores',
    label: 'Professores em atividade',
    alt: 'Professores da Apollo Body & Health em atividade',
    caption: 'Professores em atividade',
  },
];
