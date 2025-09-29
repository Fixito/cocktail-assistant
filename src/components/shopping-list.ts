import {
  component,
  html
} from '@pionjs/pion';

function ShoppingList() {
  return html`
    <section>
      <h2>Shopping List</h2>
      <button type="button">Print</button>
    </section>
  `;
}

customElements.define('shopping-list', component(ShoppingList));
