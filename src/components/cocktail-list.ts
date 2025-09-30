import {
  component,
  html
} from '@pionjs/pion';

import type { Cocktail } from '../types/cocktail';

interface CocktailListProps {
  cocktails: Cocktail[];
  hasSearched?: boolean;
}

function CocktailList({ cocktails, hasSearched = false }: CocktailListProps) {
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
      ${cocktails.map(cocktail => html`<cocktail-card .cocktail=${cocktail}></cocktail-card>`)}
    </section>
  `;
}

customElements.define('cocktail-list', component(CocktailList));

function CocktailCard({ cocktail }: { cocktail: Cocktail }) {
  const { strDrink, strDrinkThumb, strInstructions } = cocktail;

  return html`
    <article>
      <img src="${strDrinkThumb}" alt="${strDrink}" width="100" height="100" />
      <h3>${strDrink}</h3>
      <p>${strInstructions}</p>
      <button>Add</button>
    </article>
  `;
}

customElements.define('cocktail-card', component(CocktailCard));

