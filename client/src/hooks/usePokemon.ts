import { useQuery } from '@tanstack/react-query';
import { pokemonApi } from '../services/pokemonApi';
import { ViewMode } from '../types/pokemon';

export const usePokemon = (page: number, viewMode: ViewMode) => {
  return useQuery({
    queryKey: ['pokemon', page, viewMode],
    queryFn: () => pokemonApi.getPokemonList(page),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a network error and we're on infinite scroll page > 1
      if (viewMode === 'infinitescroll' && page > 1 && isNetworkError(error)) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Helper function to detect network errors
const isNetworkError = (error: any): boolean => {
  return (
    !navigator.onLine ||
    error?.message?.includes('fetch') ||
    error?.message?.includes('network') ||
    error?.name === 'NetworkError' ||
    error?.code === 'NETWORK_ERROR'
  );
};
