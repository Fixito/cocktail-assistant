import { useState } from '@pionjs/pion';

import { showToast } from '../components/toaster';

import { searchCocktailsByName } from '../services/cocktails-service';

import type { Cocktail } from '../types/cocktail';

interface UseCocktailSearchReturn {
  cocktails: Cocktail[];
  error: string | null;
  isLoading: boolean;
  hasSearched: boolean;
  searchCocktails: (searchTerm: string) => void;
}

export function useCocktailSearch(): UseCocktailSearchReturn {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const searchCocktails = async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    showToast('Searching...', 'info', 1000);

    try {
      const searchResult = await searchCocktailsByName(searchTerm);
      setCocktails(searchResult);

      if (!searchResult.length) {
        showToast('No cocktails found for your search.', 'info');
      }
    } catch (err) {
      console.error('Error loading cocktails:', err);
      setError('Unable to load cocktails. Please try again.');
      setCocktails([]);
      showToast('Error searching cocktails. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cocktails,
    error,
    isLoading,
    hasSearched,
    searchCocktails
  };
}