import {
  component,
  html
} from '@pionjs/pion';

function CocktailList() {
  return html`
    <section>
      <cocktail-card></cocktail-card>
    </section>
  `;
}

customElements.define('cocktail-list', component(CocktailList));

function CocktailCard() {
  return html`
    <article>
      <h3>Cocktail card</h3>
      <button type="button">Add</button>
    </article>
  `;
}

customElements.define('cocktail-card', component(CocktailCard));

