import React from 'react';
import { Link } from 'wouter';
import { SimplePokemon } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: SimplePokemon;
}

const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    fire: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    water: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    electric: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    grass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    ice: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    fighting: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    poison: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    ground: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    flying: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    psychic: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    bug: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
    rock: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    ghost: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    dragon: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    dark: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
    steel: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200',
    fairy: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  };
  return typeColors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <a className="block">
        <div 
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
          data-testid={`card-pokemon-${pokemon.id}`}
        >
          <div className="p-6">
            <div className="text-center">
              {/* Pokemon sprite with animated background */}
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-red/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                <img 
                  src={pokemon.sprite || '/placeholder-pokemon.png'} 
                  alt={`${pokemon.name} pokemon sprite`}
                  className="relative z-10 w-full h-full object-contain"
                  data-testid={`img-pokemon-sprite-${pokemon.id}`}
                />
              </div>
              
              <div className="space-y-2">
                <p 
                  className="text-sm text-gray-500 dark:text-gray-400 font-medium"
                  data-testid={`text-pokemon-id-${pokemon.id}`}
                >
                  #{pokemon.id.toString().padStart(3, '0')}
                </p>
                <h3 
                  className="text-xl font-bold text-gray-900 dark:text-white capitalize"
                  data-testid={`text-pokemon-name-${pokemon.id}`}
                >
                  {pokemon.name}
                </h3>
                
                {/* Type badges */}
                <div className="flex justify-center space-x-2 mt-3">
                  {pokemon.types.map((type) => (
                    <span 
                      key={type}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(type)}`}
                      data-testid={`badge-type-${type}-${pokemon.id}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
