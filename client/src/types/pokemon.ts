export interface SimplePokemon {
  id: number;
  name: string;
  sprite: string;
  types: string[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  largeSprite: string;
  types: string[];
  stats: {
    name: string;
    baseStat: number;
  }[];
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type ViewMode = 'pagination' | 'loadmore';
