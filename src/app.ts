import { html } from '@pionjs/pion';

import './components/cocktail-list';
import './components/search-bar';
import './components/shopping-list';
import './components/toaster';

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
    <main class="container">
      <search-bar .onCocktailSearch=${searchCocktails}></search-bar>

      <div class="content">
        <shopping-list 
          .items=${shoppingListItems} 
          .removeItem=${removeItem}
          .clearShoppingList=${clearShoppingList}
        ></shopping-list>
        
        ${isLoading ? html`<div class="loading"></div>` : null}

        ${error ? html`<div class="text-center">${error}</div>` : null}
  
        ${!isLoading && !error ? html`
          <cocktail-list
            .cocktails=${cocktails} 
            .hasSearched=${hasSearched}
            .onAddCocktail=${addCocktailToShoppingList}
          ></cocktail-list>
        ` : null}
      </div>
  
      <app-toaster></app-toaster>
      </main>
    `;
}
