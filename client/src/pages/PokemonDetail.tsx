import React, { Suspense } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Ruler, Weight, Info, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorState } from '../components/ErrorState';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { usePokemonDetail } from '../hooks/usePokemonDetail';

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

const getStatColor = (statName: string): string => {
  const colors: Record<string, string> = {
    hp: 'bg-pokemon-green',
    attack: 'bg-pokemon-red',
    defense: 'bg-pokemon-blue',
    'special-attack': 'bg-pokemon-yellow',
    'special-defense': 'bg-purple-500',
    speed: 'bg-pokemon-yellow',
  };
  return colors[statName] || 'bg-gray-500';
};

const formatStatName = (statName: string): string => {
  return statName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const PokemonDetailContent: React.FC<{ pokemonId: string }> = ({ pokemonId }) => {
  const { data: pokemon, isLoading, error, refetch } = usePokemonDetail(parseInt(pokemonId, 10));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading Pokémon details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  if (!pokemon) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 dark:text-gray-400">Pokémon not found</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="bg-white dark:bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button 
                variant="ghost" 
                size="sm"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                data-testid="button-back"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h2 
              className="text-2xl font-bold text-gray-900 dark:text-white capitalize"
              data-testid="text-pokemon-detail-name"
            >
              {pokemon.name} Details
            </h2>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="text-center mb-8">
              {/* Large Pokemon Image */}
              <div className="relative mx-auto w-48 h-48 mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-red/20 rounded-full"></div>
                <img 
                  src={pokemon.largeSprite || pokemon.sprite} 
                  alt={`${pokemon.name} large sprite`}
                  className="relative z-10 w-full h-full object-contain"
                  data-testid="img-pokemon-detail-sprite"
                />
              </div>
              
              <div className="space-y-2">
                <p 
                  className="text-lg text-gray-500 dark:text-gray-400 font-medium"
                  data-testid="text-pokemon-detail-id"
                >
                  #{pokemon.id.toString().padStart(3, '0')}
                </p>
                <h1 
                  className="text-4xl font-bold text-gray-900 dark:text-white capitalize"
                  data-testid="text-pokemon-detail-title"
                >
                  {pokemon.name}
                </h1>
                
                {/* Type badges */}
                <div className="flex justify-center space-x-3 mt-4">
                  {pokemon.types.map((type) => (
                    <span 
                      key={type}
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getTypeColor(type)}`}
                      data-testid={`badge-detail-type-${type}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Ruler className="text-blue-600 dark:text-blue-400 w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Height</p>
                <p 
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                  data-testid="text-pokemon-height"
                >
                  {pokemon.height}m
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Weight className="text-green-600 dark:text-green-400 w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Weight</p>
                <p 
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                  data-testid="text-pokemon-weight"
                >
                  {pokemon.weight}kg
                </p>
              </div>
            </div>
            
            {/* Base Stats */}
            <div className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <BarChart3 className="mr-2 text-pokemon-blue w-5 h-5" />
                Base Stats
              </h3>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div 
                    key={stat.name} 
                    className="flex items-center justify-between"
                    data-testid={`stat-${stat.name}`}
                  >
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-24">
                      {formatStatName(stat.name)}
                    </span>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`${getStatColor(stat.name)} rounded-full h-2`}
                          style={{ width: `${Math.min((stat.baseStat / 200) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <span 
                      className="text-sm font-bold text-gray-900 dark:text-white w-8"
                      data-testid={`stat-value-${stat.name}`}
                    >
                      {stat.baseStat}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function PokemonDetail() {
  const [match, params] = useRoute('/pokemon/:id');
  
  if (!match || !params?.id) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 dark:text-gray-400">Invalid Pokémon ID</p>
        <Link href="/">
          <Button className="mt-4" data-testid="button-home">
            Go Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading Pokémon details...</p>
        </div>
      </div>
    }>
      <PokemonDetailContent pokemonId={params.id} />
    </Suspense>
  );
}
