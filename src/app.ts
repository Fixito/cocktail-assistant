import { html } from '@pionjs/pion';

import './components/cocktail-list';
import './components/search-bar';
import './components/shopping-list';

export default function App() {
  return html`
    <main>
      <search-bar></search-bar>
      <shopping-list></shopping-list>
      <cocktail-list></cocktail-list>
    </main>
  `;
}
