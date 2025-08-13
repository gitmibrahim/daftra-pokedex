import { SimplePokemon, PokemonDetail, PaginationInfo } from '../types/pokemon';

// Types for PokéAPI responses
interface PokemonApiResult {
  name: string;
  url: string;
}

interface PokemonApiListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonApiResult[];
}

interface PokemonApiType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonApiStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonApiSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonApiSprites;
  types: PokemonApiType[];
  stats: PokemonApiStat[];
}

const POKEMON_API_BASE = 'https://pokeapi.co/api/v2';
const ITEMS_PER_PAGE = 20;

export class PokemonApiService {
  private async fetchApi<T>(url: string): Promise<T> {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Pokemon API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  }

  async getPokemonList(page: number = 1): Promise<{ pokemon: SimplePokemon[], pagination: PaginationInfo }> {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const url = `${POKEMON_API_BASE}/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`;
    
    const listResponse = await this.fetchApi<PokemonApiListResponse>(url);
    
    // Extract pokemon IDs from URLs to get sprites
    const pokemonPromises = listResponse.results.map(async (item) => {
      const id = this.extractIdFromUrl(item.url);
      const pokemonData = await this.fetchApi<PokemonApiResponse>(`${POKEMON_API_BASE}/pokemon/${id}`);
      
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        sprite: pokemonData.sprites.front_default || '',
        types: pokemonData.types.map(type => type.type.name),
      };
    });

    const pokemon = await Promise.all(pokemonPromises);
    
    const totalPages = Math.ceil(listResponse.count / ITEMS_PER_PAGE);
    
    const pagination: PaginationInfo = {
      currentPage: page,
      totalPages,
      totalCount: listResponse.count,
      hasNext: !!listResponse.next,
      hasPrevious: !!listResponse.previous,
    };

    return { pokemon, pagination };
  }

  async getPokemonDetail(id: number): Promise<PokemonDetail> {
    const url = `${POKEMON_API_BASE}/pokemon/${id}`;
    const pokemonData = await this.fetchApi<PokemonApiResponse>(url);
    
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      height: pokemonData.height / 10, // Convert decimeters to meters
      weight: pokemonData.weight / 10, // Convert hectograms to kilograms
      sprite: pokemonData.sprites.front_default || '',
      largeSprite: pokemonData.sprites.other?.["official-artwork"]?.front_default || pokemonData.sprites.front_default || '',
      types: pokemonData.types.map(type => type.type.name),
      stats: pokemonData.stats.map(stat => ({
        name: stat.stat.name,
        baseStat: stat.base_stat,
      })),
    };
  }

  private extractIdFromUrl(url: string): number {
    const matches = url.match(/\/(\d+)\/$/);
    if (!matches) {
      throw new Error(`Could not extract ID from URL: ${url}`);
    }
    return parseInt(matches[1], 10);
  }
}

export const pokemonApi = new PokemonApiService();
