import { component, html } from '@pionjs/pion';

import type { ShoppingListItem } from '../hooks/use-shopping-list';

interface PrintShoppingListProps {
  items: ShoppingListItem[];
}

function PrintShoppingList({ items }: PrintShoppingListProps) {
  const handlePrint = () => {
    if (!items.length) {
      alert('No ingredients to print. Add cocktails to your list!');
      return;
    }

    const printTemplate = document.createElement('div');
    printTemplate.id = 'print-shopping-list';
    printTemplate.className = 'print-only';
    printTemplate.innerHTML = `
      <div class="print-header">
        <h1>Shopping List</h1>
      </div>
      
      <ul class="print-ingredients">
        ${items.map(item => `
          <li>
            <span class="print-ingredient-name">${item.ingredient}</span>
          </li>
        `).join('')}
      </ul>
    `;

    document.body.appendChild(printTemplate);

    window.print();

    setTimeout(() => {
      document.body.removeChild(printTemplate);
    }, 0);
  };

  return html`
    <button 
      type="button" 
      title="Print shopping list"
      @click=${handlePrint}
    >
      Print Shopping List
    </button>
  `;
}

customElements.define('print-shopping-list', component(PrintShoppingList));
