import {
  component,
  html,
  useState
} from '@pionjs/pion';

interface SearchBarProps {
  onCocktailSearch: (term: string) => void;
}

function SearchBar({ onCocktailSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  const handleInputChange = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setSearchTerm(value);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    const trimmedTerm = searchTerm.trim();

    if (!trimmedTerm) {
      return;
    }

    if (trimmedTerm === lastSearchTerm) {
      return;
    }

    setLastSearchTerm(trimmedTerm);
    onCocktailSearch(trimmedTerm);
  };

  return html`
    <section>
      <h2 class="sr-only">Search Cocktails</h2>
    
      <form @submit=${handleSubmit}>
        <div class="input-group">
          <label for="search" class="sr-only">Cocktail name</label>
          <input
          type="search"
          id="search"
          placeholder="Search cocktails..."
          .value=${searchTerm}
          @input=${handleInputChange}
          autofocus
          />
          <button type="submit" class="search-btn">Search</button>
        </div>
        </form>
    </section>
  `;
}

customElements.define('search-bar', component(SearchBar, { useShadowDOM: false }));
