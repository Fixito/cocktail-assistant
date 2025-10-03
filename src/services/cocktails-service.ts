import type { ApiCocktailResponse, Cocktail } from "../types/cocktail";
import { transformCocktailResponse } from "../types/cocktail";

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export async function searchCocktailsByName(searchTerm: string): Promise<Cocktail[]> {
  try {
    const response = await fetch(`${URL}${searchTerm}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ApiCocktailResponse = await response.json();

    const cocktails = transformCocktailResponse(data);

    return cocktails;
  } catch (error) {
    console.error('Error fetching cocktails:', error);
    throw error;
  }
}
