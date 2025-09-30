import { html, useState } from '@pionjs/pion';

import './components/cocktail-list';
import './components/search-bar';
import './components/shopping-list';

import { searchCocktailsByName } from './services/cocktails-service';

import type { Cocktail } from './types/cocktail';

export default function App() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleCocktailSearch = async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const { drinks } = await searchCocktailsByName(searchTerm);
      setCocktails(Array.isArray(drinks) ? drinks : []);
    } catch (err) {
      console.error('Error loading cocktails:', err);
      setError('Unable to load cocktails. Please try again.');
      setCocktails([]);
    } finally {
      setIsLoading(false);
    }
  };

  return html`
    <main>
      <search-bar .onCocktailSearch=${handleCocktailSearch}></search-bar>
      <shopping-list></shopping-list>
      
      ${isLoading ? html`<div>Searching...</div>` : null}
      
      ${error ? html`
        <div class="error">
          <p>${error}</p>
        </div>
      ` : null}
      
      <cocktail-list .cocktails=${cocktails} .hasSearched=${hasSearched}></cocktail-list>
    </main>
  `;
}
