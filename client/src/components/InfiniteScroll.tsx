import React, { useEffect, useRef, useCallback, useState } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface InfiniteScrollProps {
  children: React.ReactNode;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number; // Distance from bottom to trigger loading (in pixels)
  className?: string;
  error?: Error | null;
  onRetry?: () => void;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 500,
  className = "",
  error,
  onRetry,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(isLoading);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-retry when connection comes back if there was an error
      if (error && onRetry) {
        setTimeout(() => {
          onRetry();
        }, 1000); // Wait 1 second before retrying
      }
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [error, onRetry]);

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
    [hasMore, onLoadMore],
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
        <div
          className="text-center py-12"
          data-testid="infinite-scroll-loading"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-pokemon-blue to-pokemon-red rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-xl animate-spin">⚡</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading more Pokémon...
          </p>
          <div className="flex justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-pokemon-blue rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-pokemon-blue rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pokemon-blue rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      )}

      {/* Error state for loading more */}
      {error && !isLoading && (
        <div className="text-center py-12">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              !isOnline
                ? "bg-red-100 dark:bg-red-900/20"
                : "bg-orange-100 dark:bg-orange-900/20"
            }`}
          >
            <span className="text-2xl">{!isOnline ? "📵" : "⚠️"}</span>
          </div>
          <p
            className={`text-lg font-semibold mb-2 ${
              !isOnline
                ? "text-red-600 dark:text-red-400"
                : "text-orange-600 dark:text-orange-400"
            }`}
            data-testid="text-infinite-scroll-error"
          >
            {!isOnline ? "You are offline" : "Connection Error"}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {!isOnline
              ? "Please check your internet connection to load more Pokémon."
              : "Unable to load more Pokémon. This might be a temporary issue."}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={!isOnline}
              className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                !isOnline
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-pokemon-blue hover:bg-blue-600 text-white"
              }`}
              data-testid="button-retry-infinite-scroll"
            >
              {!isOnline ? "Waiting for connection..." : "Try Again"}
            </button>
          )}

          {/* Connection status indicator */}
          <div
            className={`inline-flex items-center mt-4 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
              isOnline
                ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                : "bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${
                isOnline ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
            ></div>
            {isOnline ? "Connected - Retrying..." : "Offline"}
          </div>
        </div>
      )}

      {/* End of content message - only show when no error and isOnline*/}
      {!hasMore && !isLoading && !error && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-pokemon-yellow to-pokemon-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-3xl">⚡</span>
          </div>
          <p
            className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            data-testid="text-end-of-pokemon"
          >
            {isOnline ? "You've caught them all!" : "You are offline!"}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isOnline
              ? "All 1000+ Pokémon have been discovered"
              : "Please connect to the internet to see more."}
          </p>
        </div>
      )}
    </div>
  );
};
