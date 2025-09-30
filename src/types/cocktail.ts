type NullableString = string | null;

export interface Cocktail {
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

  // Mesures (1 à 15)
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

export interface CocktailResponse {
  drinks: Cocktail[] | string;
}
