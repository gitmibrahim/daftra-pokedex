import React, { useState } from 'react';

interface PokemonImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  size?: 'small' | 'medium' | 'large';
  testId?: string;
}

const sizeClasses = {
  small: 'w-24 h-24',
  medium: 'w-32 h-32', 
  large: 'w-48 h-48'
};

const skeletonSizeClasses = {
  small: 'w-20 h-20',
  medium: 'w-28 h-28',
  large: 'w-44 h-44'
};

export const PokemonImage: React.FC<PokemonImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  size = 'medium',
  testId
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative mx-auto ${sizeClasses[size]} ${containerClassName}`}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pokemon-blue/20 to-pokemon-red/20 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
      
      {/* Loading skeleton */}
      {isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center ${sizeClasses[size]}`}>
          <div className={`${skeletonSizeClasses[size]} bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full animate-pulse`}>
            <div className="absolute inset-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-500 dark:to-gray-600 rounded-full animate-pulse delay-75"></div>
            <div className="absolute inset-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-400 dark:to-gray-500 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasError && !isLoading && (
        <div className={`absolute inset-0 flex items-center justify-center ${sizeClasses[size]}`}>
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-xl">❓</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Image not found</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      <img 
        src={src}
        alt={alt}
        className={`relative z-10 w-full h-full object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'hidden' : ''} ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        data-testid={testId}
      />
    </div>
  );
};