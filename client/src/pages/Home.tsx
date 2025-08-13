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

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <>
      <PokemonGrid 
        pokemon={data?.pokemon || []} 
        isLoading={isLoading}
        error={error}
      />
      
      {data?.pagination && !isLoading && (
        <PaginationControls
          pagination={data.pagination}
          onPageChange={handlePageChange}
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
    if (data?.pagination.hasNext && !isLoading && !error) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    refetch();
  };

  if (error && currentPage === 1) {
    return <ErrorState error={error} onRetry={() => refetch()} />;
  }

  return (
    <>
      <InfiniteScroll
        hasMore={data?.pagination.hasNext || false}
        isLoading={isLoading && currentPage > 1}
        onLoadMore={handleLoadMore}
        threshold={300}
        error={currentPage > 1 ? error : null}
        onRetry={handleRetry}
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
