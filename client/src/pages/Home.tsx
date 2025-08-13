import React, { useState, Suspense } from 'react';
import { Layout } from '../components/Layout';
import { PokemonGrid } from '../components/PokemonGrid';
import { PaginationControls } from '../components/PaginationControls';
import { InfiniteScroll } from '../components/InfiniteScroll';
import { ErrorState } from '../components/ErrorState';
import { usePokemon } from '../hooks/usePokemon';
import { ViewMode, SimplePokemon } from '../types/pokemon';
import { SkeletonCard } from '../components/SkeletonCard';

const PaginationView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = usePokemon(currentPage, 'pagination');

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search Pokémon..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-pokemon-blue focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              data-testid="input-search"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-pokemon-blue bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              data-testid="select-type-filter"
            >
              <option>All Types</option>
              <option>Fire</option>
              <option>Water</option>
              <option>Electric</option>
              <option>Grass</option>
            </select>
            
            <div className="text-gray-600 dark:text-gray-400 font-medium" data-testid="text-total-results">
              {data?.pagination.totalCount || 0} Pokémon
            </div>
          </div>
        </div>
      </div>

      <PokemonGrid 
        pokemon={data?.pokemon || []} 
        isLoading={isLoading}
        error={error}
      />
      
      {data?.pagination && !isLoading && (
        <PaginationControls
          pagination={data.pagination}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}
    </>
  );
};

const InfiniteScrollView: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<SimplePokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = usePokemon(currentPage, 'infinitescroll');

  React.useEffect(() => {
    if (data?.pokemon) {
      if (currentPage === 1) {
        setAllPokemon(data.pokemon);
      } else {
        setAllPokemon(prev => [...prev, ...data.pokemon]);
      }
    }
  }, [data, currentPage]);

  const handleLoadMore = () => {
    if (data?.pagination.hasNext && !isLoading) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (error && currentPage === 1) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search Pokémon..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-pokemon-blue focus:border-transparent bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              data-testid="input-search-infinitescroll"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              className="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-pokemon-blue bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              data-testid="select-type-filter-infinitescroll"
            >
              <option>All Types</option>
              <option>Fire</option>
              <option>Water</option>
              <option>Electric</option>
              <option>Grass</option>
            </select>
            
            <div className="text-gray-600 dark:text-gray-400 font-medium" data-testid="text-loaded-count">
              {allPokemon.length} Pokémon loaded
            </div>
          </div>
        </div>
      </div>

      <InfiniteScroll
        hasMore={data?.pagination.hasNext || false}
        isLoading={isLoading && currentPage > 1}
        onLoadMore={handleLoadMore}
        threshold={300}
      >
        <PokemonGrid 
          pokemon={allPokemon} 
          isLoading={currentPage === 1 && isLoading}
          error={error}
        />
      </InfiniteScroll>
    </>
  );
};

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewMode>('infinitescroll');

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {Array.from({ length: 20 }).map((_, index) => (
            <SkeletonCard key={`loading-skeleton-${index}`} />
          ))}
        </div>
      }>
        {currentView === 'pagination' ? <PaginationView /> : <InfiniteScrollView />}
      </Suspense>
    </Layout>
  );
}
