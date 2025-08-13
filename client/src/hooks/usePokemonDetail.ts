import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../services/pokemonApi';

export const usePokemonDetail = (id: number) => {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => pokemonApi.getPokemonDetail(id),
    enabled: !!id && id > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
