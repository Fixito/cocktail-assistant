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
      <section class="shopping-list-section">
        <header>
          <h2>Shopping List</h2>
        </header>

        <p class="text-muted text-center">
          No ingredients added yet. Add cocktails to build your shopping list!
        </p>
      </section>
    `;
  }

  return html`
    <section class="shopping-list-section">
      <header>
        <h2>Shopping List</h2>
      </header>

      <ul class="shopping-list">
        ${items.map((item) => html`
          <li class="shopping-list__item">
            <span>${item.ingredient}</span>
            <button 
              type="button" 
              title="Remove item"
              @click=${() => removeItem(item.ingredient)}
              data-variant="secondary"
            >
              &times;
            </button>
          </li>
        `)}
      </ul>

      <div class="shopping-list__actions">
        <print-shopping-list .items=${items}></print-shopping-list>
        <button type="button" data-variant="soft" @click=${clearShoppingList}>Clear All</button>
      </div>
    </section>
  `;
}

customElements.define('shopping-list', component(ShoppingList, { useShadowDOM: false }));
