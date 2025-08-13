

# Overview

## 🌟 Pokédex Application

**A modern, responsive Pokédex built with React, TypeScript, and Vite**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-blue?style=for-the-badge&logo=netlify)](https://daftra-pokedex.netlify.app/)

---

This is a frontend-only Pokédex application built with React, TypeScript, and Vite that allows users to browse and view detailed information about Pokémon. The application fetches data directly from the PokéAPI and presents it in a modern, responsive interface with both pagination and infinite scroll viewing modes. Users can view Pokémon in a grid layout, see detailed stats and information for individual Pokémon, and navigate between different viewing modes. The UI features a centered design with enhanced headers, loading states, footer controls, and network error handling.

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing with routes for home (`/`) and Pokémon detail (`/pokemon/:id`)
- **State Management**: TanStack Query (React Query) for server state management, data fetching, caching, and background updates
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Build Tool**: Vite for fast development server and optimized production builds

## Data Management
- **API Integration**: Direct integration with PokéAPI for Pokemon data fetching
- **Type Safety**: TypeScript interfaces for PokéAPI response validation and data transformation
- **Client-Side Data**: All data fetched and managed on the frontend with React Query for caching and state management
- **Network Handling**: Comprehensive error handling for offline/online states and connection issues

## Component Architecture
- **UI Components**: shadcn/ui component system providing consistent, accessible components
- **Error Boundaries**: React Error Boundaries for graceful error handling and recovery
- **Loading States**: Skeleton components and loading spinners for improved perceived performance
- **Responsive Design**: Mobile-first responsive design with adaptive layouts

## Development Features
- **Hot Reload**: Vite HMR for instant development feedback
- **Error Overlay**: Runtime error modal for development debugging
- **TypeScript**: Strict type checking across the entire application
- **Path Aliases**: Configured import aliases for cleaner import statements

# External Dependencies

## Third-Party APIs
- **PokéAPI**: Primary and only data source for Pokémon information, sprites, stats, and type data
  - Base URL: `https://pokeapi.co/api/v2`
  - Used for fetching Pokémon lists, individual Pokémon details, and sprites
  - No authentication required, public API with CORS support

## UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Icon library for consistent iconography
- **Google Fonts**: Custom font loading for typography

## Development Tools
- **Replit Integration**: Replit-specific plugins for development environment integration
- **PostCSS**: CSS processing for Tailwind and autoprefixer
- **ESBuild**: Fast bundling for production builds