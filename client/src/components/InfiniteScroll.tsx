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
        <div className="text-center py-12" data-testid="infinite-scroll-loading">
          <div className="w-12 h-12 bg-gradient-to-br from-pokemon-blue to-pokemon-red rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current animate-spin">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading more Pokémon...</p>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-pokemon-blue rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-pokemon-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-pokemon-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      )}
      
      {/* End of content message */}
      {!hasMore && !isLoading && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-pokemon-yellow to-pokemon-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">⚡</span>
          </div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2" data-testid="text-end-of-pokemon">
            You've caught them all!
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            All 1000+ Pokémon have been discovered
          </p>
        </div>
      )}
    </div>
  );
};