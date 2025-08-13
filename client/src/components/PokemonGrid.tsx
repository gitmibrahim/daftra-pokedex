import React from 'react';
import { PokemonCard } from './PokemonCard';
import { SkeletonCard } from './SkeletonCard';
import { SimplePokemon } from '../types/pokemon';

interface PokemonGridProps {
  pokemon: SimplePokemon[];
  isLoading?: boolean;
  error?: Error | null;
}

export const PokemonGrid: React.FC<PokemonGridProps> = ({ 
  pokemon, 
  isLoading = false,
  error 
}) => {
  if (error) {
    return (
      <div className="text-center py-16" data-testid="error-pokemon-grid">
        <p className="text-red-600 dark:text-red-400">
          Failed to load Pokemon: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
      data-testid="grid-pokemon"
    >
      {isLoading ? (
        // Show skeleton cards during loading
        Array.from({ length: 20 }).map((_, index) => (
          <SkeletonCard key={`skeleton-${index}`} />
        ))
      ) : (
        pokemon.map((pokemonItem) => (
          <PokemonCard key={pokemonItem.id} pokemon={pokemonItem} />
        ))
      )}
    </div>
  );
};
