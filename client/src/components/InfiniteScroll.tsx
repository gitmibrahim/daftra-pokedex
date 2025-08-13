import React, { useEffect, useRef, useCallback } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number; // Distance from bottom to trigger loading (in pixels)
  className?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 500,
  className = '',
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(isLoading);

  // Update loading ref when prop changes
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      
      // If the sentinel is visible and we're not already loading and there's more content
      if (target.isIntersecting && !isLoadingRef.current && hasMore) {
        onLoadMore();
      }
    },
    [hasMore, onLoadMore]
  );

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    });

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, threshold]);

  return (
    <div className={className}>
      {children}
      
      {/* Sentinel element - invisible trigger for loading more */}
      <div ref={sentinelRef} className="h-4" />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="text-center py-8" data-testid="infinite-scroll-loading">
          <LoadingSpinner size="md" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading more Pokémon...</p>
        </div>
      )}
      
      {/* End of content message */}
      {!hasMore && !isLoading && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🐉</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium" data-testid="text-end-of-pokemon">
            You've caught them all!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            No more Pokémon to discover
          </p>
        </div>
      )}
    </div>
  );
};