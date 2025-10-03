# Cocktail Assistant 🍸

A modern, interactive web application for discovering cocktail recipes and managing ingredient shopping lists. Built with TypeScript and the Pion framework, this application provides a seamless experience for cocktail enthusiasts and home bartenders.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [API Integration](#api-integration)
- [Performance Features](#performance-features)
- [Contributing](#contributing)

## ✨ Features

- **🔍 Cocktail Search**: Search thousands of cocktail recipes from TheCocktailDB API
- **📝 Shopping List**: Automatically generate ingredient shopping lists from selected cocktails
- **🔄 Smart Deduplication**: Prevent duplicate ingredients in your shopping list using Set-based data structures
- **⚡ Data Optimization**: Intelligent API data transformation reducing memory usage by ~90%
- **🧰 Utility Functions**: Helper functions for ingredient analysis and cocktail comparison
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🖨️ Print Support**: Print-friendly shopping list formatting with CSS media queries
- **🔔 Toast Notifications**: User-friendly feedback system for actions and errors
- **⚡ Race Condition Handling**: Robust async operations with proper error handling
- **🎯 SEO Optimized**: Meta descriptions and search engine optimization

## 🛠️ Technology Stack

- **Framework**: [@pionjs/pion](https://github.com/pionjs/pion) v2.8.3 - React-like hooks framework
- **Language**: TypeScript v5.8.3 - Type-safe JavaScript development
- **Build Tool**: Vite v7.1.7 - Fast build tool and development server
- **API**: [TheCocktailDB](https://www.thecocktaildb.com/api.php) - Free cocktail database API
- **Styling**: CSS with CSS Layers architecture and custom properties
- **Module System**: ES2022 modules with top-level await support

## 🏗️ Project Architecture

The application follows a component-based architecture with custom hooks for state management:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │    │      Hooks       │    │    Services     │
│                 │    │                  │    │                 │
│ • SearchBar     │◄──►│ • useCocktail    │◄──►│ • CocktailsAPI  │
│ • CocktailList  │    │   Search         │    │                 │
│ • ShoppingList  │    │ • useShoppingList│    │                 │
│ • Toaster       │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Key Architectural Decisions

- **Data Layer Separation**: Clean separation between raw API data (`ApiCocktail`) and application data (`Cocktail`)
- **Preprocessing Pipeline**: Intelligent data transformation at the service layer
- **Shadow DOM Disabled**: All components use `{ useShadowDOM: false }` for external CSS compatibility
- **CSS Layers**: Organized stylesheet with semantic layer ordering (normalize → reset → base → theme → components → utilities)
- **Type Safety**: Comprehensive TypeScript interfaces with optimized data structures
- **Error Boundaries**: Robust error handling with user-friendly messaging
- **State Management**: React-like hooks pattern with centralized state logic
- **Utility Layer**: Reusable helper functions for common cocktail operations

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cocktail-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run preview` - Preview production build locally

## 📁 Project Structure

```
cocktail-assistant/
├── public/                    # Static assets
│   └── vite.svg              # Application icon
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── cocktail-list.ts  # Cocktail search results display
│   │   ├── search-bar.ts     # Search input component
│   │   ├── shopping-list.ts  # Ingredient list management
│   │   └── toaster.ts        # Notification system
│   ├── hooks/                # Custom React-like hooks
│   │   ├── use-cocktail-search.ts  # Search state & API calls
│   │   └── use-shopping-list.ts    # Shopping list state
│   ├── services/             # External API integrations
│   │   └── cocktails-service.ts    # TheCocktailDB API client with data transformation
│   ├── styles/               # CSS architecture
│   │   └── main.css          # Comprehensive stylesheet with layers
│   ├── types/                # TypeScript type definitions
│   │   └── cocktail.ts       # Optimized interfaces & data transformations
│   ├── utils/                # Utility functions
│   │   └── cocktail-helpers.ts     # Cocktail manipulation helpers
│   ├── app.ts                # Main application component
│   └── main.ts               # Application entry point
├── index.html                # HTML template with SEO meta tags
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.js            # Vite build configuration
```

## 🔧 Development

### Component Development

Components are built using the Pion framework with TypeScript:

```typescript
import { html, LitElement } from '@pionjs/pion';

export class SearchBar extends LitElement {
  static options = { useShadowDOM: false }; // External CSS compatibility

  // Component implementation
}
```

### State Management

Custom hooks provide centralized state logic:

```typescript
// Example hook structure
export function useCocktailSearch() {
  const [state, setState] = useState(initialState);

  return {
    cocktails,
    searchCocktails,
    error,
    isLoading,
  };
}
```

### CSS Architecture

The project uses a modern layered CSS approach with perfect cascade control:

```css
@layer normalize, reset, base, theme, buttons, utilities, alerts, form, layout, components, print;
```

#### Layer Organization (Specificity Order)

1. **`normalize`** - CSS normalization (external import)
2. **`reset`** - CSS reset for consistent base styles
3. **`base`** - Base typography, focus styles, and element defaults
4. **`theme`** - Design tokens and semantic color variables (light/dark themes)
5. **`buttons`** - Button components and variants (primary, secondary, soft)
6. **`utilities`** - Utility classes (.sr-only, .text-center, .container)
7. **`alerts`** - Alert components (.alert-danger, .alert-success)
8. **`form`** - Form styling (inputs, labels, validation)
9. **`layout`** - Responsive layout and grid systems
10. **`components`** - Business components (.cocktail-card, .shopping-list, .toaster, .loading)
11. **`print`** - Print-specific styles (@media print)

#### CSS Architecture Benefits

- **🎯 Zero Specificity Wars**: Layers define priority, eliminating `!important` overrides
- **📦 Modular Organization**: Each concern has its dedicated layer
- **🔄 Easy Maintenance**: Adding styles to the correct layer prevents conflicts
- **🚀 Performance**: Optimized cascade reduces style recalculation
- **🎨 Theme System**: Semantic variables enable effortless dark/light mode switching
- **📱 Responsive**: Fluid typography and mobile-first responsive design

## 🌐 API Integration

The application integrates with TheCocktailDB API:

- **Endpoint**: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s={searchTerm}`
- **Rate Limiting**: Handles API rate limits gracefully
- **Error Handling**: Comprehensive error states for network issues
- **Race Conditions**: Prevents outdated search results from overriding newer ones

### Data Optimization & Transformation

The application implements intelligent data transformation to optimize performance and maintainability:

```typescript
// Raw API Interface (60+ properties)
interface ApiCocktail {
  idDrink: string;
  strDrink: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  // ... 50+ additional unused properties
}

// Optimized Application Interface (5 properties)
interface Cocktail {
  id: string;
  name: string;
  image: string;
  instructions: string;
  ingredients: string[]; // Processed array from strIngredient1-15
}
```

#### Transformation Benefits

- **🚀 90% Data Reduction**: From 60+ properties to 5 essential properties
- **⚡ Performance**: Reduced memory footprint and faster processing
- **🧹 Clean Code**: Semantic property names (`name` vs `strDrink`)
- **🛠️ Maintainability**: API changes isolated to transformation layer
- **🎯 Type Safety**: Focused interfaces prevent misuse of unused data

## ⚡ Performance Features

- **Data Transformation**: Intelligent preprocessing reduces API data by ~90%
- **Optimized Interfaces**: Clean, focused TypeScript interfaces for better bundle size
- **Smart Ingredients Processing**: Automatic filtering and array conversion from API
- **Async/Await**: Modern JavaScript async patterns for better performance
- **Race Condition Prevention**: Smart request cancellation for search operations
- **Efficient Re-renders**: Optimized component updates with proper dependency tracking
- **Memory Management**: Set-based deduplication prevents memory leaks in shopping lists
- **Lazy Loading**: Components loaded only when needed

### Utility Functions

The application includes comprehensive utility functions for cocktail manipulation:

```typescript
// Cocktail helper utilities
formatIngredients(cocktail); // Format ingredients for display
hasAllIngredients(cocktail, available); // Check ingredient availability
getMissingIngredients(cocktail, available); // Get missing ingredients
getMissingIngredientsCount(cocktail, available); // Count missing ingredients
```

## 🎨 Styling Standards

- **CSS Layers Architecture**: Modern cascade control eliminating specificity conflicts
- **CSS Custom Properties**: Semantic design tokens with OKLCH color space for consistent theming
- **Responsive Design**: Mobile-first approach with fluid typography (clamp-based scaling)
- **Print Optimization**: Dedicated print layer with optimized shopping list formatting
- **Dark/Light Themes**: Automatic theme switching based on user preference
- **Component Isolation**: Each component properly scoped within layers
- **Performance**: Minimal CSS bundle with unused styles removed
- **Accessibility**: WCAG-compliant focus management and color contrasts

## 🔗 Additional Resources

- [Pion Framework Documentation](https://github.com/pionjs/pion)
- [TheCocktailDB API Documentation](https://www.thecocktaildb.com/api.php)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)

---

**Built with ❤️ and modern web technologies**
