import {
  component,
  html
} from '@pionjs/pion';

import type { ShoppingListItem } from '../hooks/use-shopping-list';

import './print-shopping-list';

interface ShoppingListProps {
  items: ShoppingListItem[];
  removeItem: (ingredient: string) => void;
  clearShoppingList: () => void;
}

function ShoppingList({ items, removeItem, clearShoppingList }: ShoppingListProps) {

  if (!items.length) {
    return html`
      <section>
        <h2>Shopping List</h2>
        <p>
          No ingredients added yet. Add cocktails to build your shopping list!
        </p>
      </section>
    `;
  }

  return html`
    <section>
      <header>
        <h2>Shopping List</h2>
      </header>

      <ul>
        ${items.map((item) => html`
          <li>
            <span>${item.ingredient}</span>
            <button 
              type="button" 
              title="Remove item"
              @click=${() => removeItem(item.ingredient)}
            >x</button>
          </li>
        `)}
      </ul>

      <div>
        <print-shopping-list .items=${items}></print-shopping-list>
        <button type="button" @click=${clearShoppingList}>Clear All</button>
      </div>
    </section>
  `;
}

customElements.define('shopping-list', component(ShoppingList));
