import {
  component,
  html
} from '@pionjs/pion';

import type { Cocktail } from '../types/cocktail';

interface CocktailListProps {
  cocktails: Cocktail[];
  hasSearched?: boolean;
  onAddCocktail: (cocktail: Cocktail) => void;
}

function CocktailList({ cocktails, hasSearched = false, onAddCocktail }: CocktailListProps) {
  if (!cocktails.length && hasSearched) {
    return html`
      <section class="cocktail-list-section">
        <h2 class="sr-only">Cocktail List</h2>
        <p class="text-muted text-center">No cocktails found.</p>
      </section>`;
  }

  if (!cocktails.length && !hasSearched) {
    return html`
      <section class="cocktail-list-section">
        <h2 class="sr-only">Cocktail List</h2>
        <p class="text-muted text-center">Search for cocktails to get started!</p>
      </section>`;
  }

  return html`
    <section class="cocktail-list-section">
      <h2 class="sr-only">Cocktail List</h2>
      
      <ul class="cocktail-list">
        ${cocktails.map(cocktail => html`
          <cocktail-card 
            .cocktail=${cocktail}
            .onAddCocktail=${onAddCocktail}
          ></cocktail-card>
        `)}
      </ul>
    </section>
  `;
}

customElements.define('cocktail-list', component(CocktailList, { useShadowDOM: false }));

interface CocktailCardProps {
  cocktail: Cocktail;
  onAddCocktail: (cocktail: Cocktail) => void;
}

function CocktailCard({ cocktail, onAddCocktail }: CocktailCardProps) {
  const { name, image, instructions } = cocktail;

  const handleAdd = () => {
    onAddCocktail(cocktail);
  };

  return html`
    <li class="cocktail-card">
      <img 
        src="${image}" 
        alt="${name}" 
        class="img"
      />
      <div class="cocktail-card__body">
        <h3 class="cocktail-card__title">${name}</h3>
        <p class="cocktail-card__instructions">${instructions}</p>
        <div class="cocktail-card__btn-container">
          <button 
            title="Add to Shopping List" 
            @click=${handleAdd}    
            class="cocktail-card__btn"
          >
            +
          </button>
        </div>
      </div>
    </li>
  `;
}

customElements.define('cocktail-card', component(CocktailCard, { useShadowDOM: false }));

