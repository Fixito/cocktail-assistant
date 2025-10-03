type NullableString = string | null;

// Interface for raw API data (all properties)
export interface ApiCocktail {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: NullableString;
  strTags: NullableString;
  strVideo: NullableString;

  strCategory: NullableString;
  strIBA: NullableString;
  strAlcoholic: NullableString;
  strGlass: NullableString;

  strInstructions: NullableString;
  strInstructionsDE: NullableString;
  strInstructionsES: NullableString;
  strInstructionsFR: NullableString;
  strInstructionsIT: NullableString;
  strInstructionsZH_HANS: NullableString;
  strInstructionsZH_HANT: NullableString;

  strDrinkThumb: NullableString;

  strIngredient1: NullableString;
  strIngredient2: NullableString;
  strIngredient3: NullableString;
  strIngredient4: NullableString;
  strIngredient5: NullableString;
  strIngredient6: NullableString;
  strIngredient7: NullableString;
  strIngredient8: NullableString;
  strIngredient9: NullableString;
  strIngredient10: NullableString;
  strIngredient11: NullableString;
  strIngredient12: NullableString;
  strIngredient13: NullableString;
  strIngredient14: NullableString;
  strIngredient15: NullableString;

  strMeasure1: NullableString;
  strMeasure2: NullableString;
  strMeasure3: NullableString;
  strMeasure4: NullableString;
  strMeasure5: NullableString;
  strMeasure6: NullableString;
  strMeasure7: NullableString;
  strMeasure8: NullableString;
  strMeasure9: NullableString;
  strMeasure10: NullableString;
  strMeasure11: NullableString;
  strMeasure12: NullableString;
  strMeasure13: NullableString;
  strMeasure14: NullableString;
  strMeasure15: NullableString;

  strImageSource: NullableString;
  strImageAttribution: NullableString;
  strCreativeCommonsConfirmed: NullableString;
  dateModified: NullableString;
}

// Optimized interface for the application (only used data)
export interface Cocktail {
  id: string;
  name: string;
  image: string;
  instructions: string;
  ingredients: string[];
}

// Interface for API response
export interface ApiCocktailResponse {
  drinks: ApiCocktail[] | string;
}

/**
 * Transforms raw API data into optimized format for the application
 */
export function transformCocktail(apiCocktail: ApiCocktail): Cocktail {
  // Extract non-empty ingredients
  const ingredients: string[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = apiCocktail[`strIngredient${i}` as keyof ApiCocktail] as string;

    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient.trim());
    }
  }

  return {
    id: apiCocktail.idDrink,
    name: apiCocktail.strDrink,
    image: apiCocktail.strDrinkThumb || '',
    instructions: apiCocktail.strInstructions || '',
    ingredients
  };
}

/**
 * Transforms the complete API response
 */
export function transformCocktailResponse(apiResponse: ApiCocktailResponse): Cocktail[] {
  if (typeof apiResponse.drinks === 'string' || !apiResponse.drinks) {
    return [];
  }

  return apiResponse.drinks.map(transformCocktail);
}
