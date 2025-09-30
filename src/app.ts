import { html } from '@pionjs/pion';

import './components/cocktail-list';
import './components/search-bar';
import './components/shopping-list';

import { useCocktailSearch } from './hooks/use-cocktail-search';
import { useShoppingList } from './hooks/use-shopping-list';

export default function App() {
  const {
    cocktails,
    error,
    isLoading,
    hasSearched,
    searchCocktails
  } = useCocktailSearch();

  const {
    items: shoppingListItems,
    addCocktailToShoppingList,
    removeItem,
    clearShoppingList
  } = useShoppingList();

  return html`
    <main>
      <search-bar .onCocktailSearch=${searchCocktails}></search-bar>
      <shopping-list 
        .items=${shoppingListItems} 
        .removeItem=${removeItem}
        .clearShoppingList=${clearShoppingList}
      ></shopping-list>
      
      ${isLoading ? html`<div>Searching...</div>` : null}
      
      ${error ? html`
        <div class="error">
          <p>${error}</p>
        </div>
      ` : null}
      
      <cocktail-list 
        .cocktails=${cocktails} 
        .hasSearched=${hasSearched}
        .onAddCocktail=${addCocktailToShoppingList}
      ></cocktail-list>
    </main>
  `;
}
