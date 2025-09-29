import {
  component,
  html
} from '@pionjs/pion';

function SearchBar() {
  return html`
    <div>
      <input type="search" placeholder="Search cocktails..." />
      <button>Search</button>
    </div>
  `;
}

customElements.define('search-bar', component(SearchBar));
