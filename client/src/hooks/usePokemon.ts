import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../services/pokemonApi';
import { ViewMode } from '../types/pokemon';

export const usePokemon = (page: number, viewMode: ViewMode) => {
  return useQuery({
    queryKey: ['pokemon', page, viewMode],
    queryFn: () => pokemonApi.getPokemonList(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
