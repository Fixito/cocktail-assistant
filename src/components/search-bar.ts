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
    <div>
      <form @submit=${handleSubmit}>
        <input
          type="search"
          placeholder="Search cocktails..."
          .value=${searchTerm}
          @input=${handleInputChange}
        />
        <button>Search</button>
      </form>
    </div>
  `;
}

customElements.define('search-bar', component(SearchBar));
