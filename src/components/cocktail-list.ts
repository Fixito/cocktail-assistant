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
      <section>
        <p>No cocktails found.</p>
      </section>`;
  }

  if (!cocktails.length && !hasSearched) {
    return html`
      <section>
        <p>Search for cocktails to get started!</p>
      </section>`;
  }

  return html`
    <section>
      <h2>Cocktail List</h2>
      ${cocktails.map(cocktail => html`
        <cocktail-card 
          .cocktail=${cocktail}
          .onAddCocktail=${onAddCocktail}
        ></cocktail-card>
      `)}
    </section>
  `;
}

customElements.define('cocktail-list', component(CocktailList));

interface CocktailCardProps {
  cocktail: Cocktail;
  onAddCocktail: (cocktail: Cocktail) => void;
}

function CocktailCard({ cocktail, onAddCocktail }: CocktailCardProps) {
  const { strDrink, strDrinkThumb, strInstructions } = cocktail;

  const handleAdd = () => {
    onAddCocktail(cocktail);
  };

  return html`
    <article>
      <img src="${strDrinkThumb}" alt="${strDrink}" width="100" height="100" />
      <h3>${strDrink}</h3>
      <p>${strInstructions}</p>
      <button @click=${handleAdd}>Add to Shopping List</button>
    </article>
  `;
}

customElements.define('cocktail-card', component(CocktailCard));

