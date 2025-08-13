# Overview

This is a Pokédex application built with React, TypeScript, and Express.js that allows users to browse and view detailed information about Pokémon. The application fetches data from the PokéAPI and presents it in a modern, responsive interface with both pagination and infinite scroll viewing modes. Users can view Pokémon in a grid layout, see detailed stats and information for individual Pokémon, and navigate between different viewing modes. The UI features a centered design with enhanced headers, loading states, and footer controls.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing with routes for home (`/`) and Pokémon detail (`/pokemon/:id`)
- **State Management**: TanStack Query (React Query) for server state management, data fetching, caching, and background updates
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Build Tool**: Vite for fast development server and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **Language**: TypeScript throughout the entire application
- **Development Mode**: Vite middleware integration for hot module replacement and development features
- **Production**: Compiled to ES modules with esbuild for optimal performance
- **Storage Interface**: Extensible storage interface with in-memory implementation (designed to be easily replaced with database storage)

## Data Management
- **Database ORM**: Drizzle ORM configured for PostgreSQL with Neon Database serverless
- **Schema Validation**: Zod schemas for runtime type validation and API data parsing
- **Shared Types**: Common schemas and types shared between client and server in the `/shared` directory
- **API Integration**: Custom service layer for PokéAPI integration with proper error handling and data transformation

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
- **PokéAPI**: Primary data source for Pokémon information, sprites, stats, and type data
  - Base URL: `https://pokeapi.co/api/v2`
  - Used for fetching Pokémon lists, individual Pokémon details, and sprites

## Database Services
- **Neon Database**: Serverless PostgreSQL database for data persistence
- **Drizzle ORM**: Type-safe database access layer with migration support

## UI and Styling
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Icon library for consistent iconography
- **Google Fonts**: Custom font loading for typography

## Development Tools
- **Replit Integration**: Replit-specific plugins for development environment integration
- **PostCSS**: CSS processing for Tailwind and autoprefixer
- **ESBuild**: Fast bundling for production builds