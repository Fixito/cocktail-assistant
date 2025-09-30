import type { CocktailResponse } from "../types/cocktail";

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export async function searchCocktailsByName(searchTerm: string): Promise<CocktailResponse> {
  try {
    const response = await fetch(`${URL}${searchTerm}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cocktails:', error);
    throw error;
  }
}
