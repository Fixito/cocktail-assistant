import { useEffect, useState } from '@pionjs/pion';

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
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    if (!searchTerm) return;

    let ignore = false;

    const performSearch = async () => {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const { drinks } = await searchCocktailsByName(searchTerm);

        if (!ignore) {
          setCocktails(Array.isArray(drinks) ? drinks : []);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Error loading cocktails:', err);
          setError('Unable to load cocktails. Please try again.');
          setCocktails([]);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    performSearch();

    return () => {
      ignore = true;
    };
  }, [searchTerm]);

  const searchCocktails = (term: string) => {
    setSearchTerm(term);
  };

  return {
    cocktails,
    error,
    isLoading,
    hasSearched,
    searchCocktails
  };
}