import {
  component,
  html
} from '@pionjs/pion';

import type { ShoppingListItem } from '../hooks/use-shopping-list';

interface ShoppingListProps {
  items: ShoppingListItem[];
  removeItem: (ingredient: string) => void;
  clearShoppingList: () => void;
}

function ShoppingList({ items, removeItem, clearShoppingList }: ShoppingListProps) {
  const handlePrint = () => {
    const printContent = items.map(item => item.ingredient).join('\n');

    if (printContent) {
      console.log('Shopping List:\n', printContent);
      // Ici vous pourriez implémenter une vraie fonctionnalité d'impression
    }
  };

  if (!items.length) {
    return html`
      <section>
        <h2>Shopping List</h2>
        <p>No ingredients added yet. Add cocktails to build your shopping list!</p>
      </section>
    `;
  }

  return html`
    <section>
      <h2>Shopping List (${items.length} items)</h2>
      <div class="shopping-list-actions">
        <button type="button" @click=${handlePrint}>Print</button>
        <button type="button" @click=${clearShoppingList}>Clear All</button>
      </div>
      <ul class="shopping-list">
        ${items.map((item) => html`
          <li class="shopping-item">
            <div class="item-info">
              <strong>${item.ingredient}</strong>
            </div>
            <button 
              type="button" 
              class="remove-btn" 
              @click=${() => removeItem(item.ingredient)}
              title="Remove item"
            >×</button>
          </li>
        `)}
      </ul>
    </section>
  `;
}

customElements.define('shopping-list', component(ShoppingList));
