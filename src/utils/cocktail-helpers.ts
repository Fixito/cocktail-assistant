import type { Cocktail } from '../types/cocktail';

/**
 * Formate les ingrédients d'un cocktail pour l'affichage
 */
export function formatIngredients(cocktail: Cocktail): string {
  return cocktail.ingredients.join(', ');
}

/**
 * Vérifie si un cocktail a tous les ingrédients nécessaires
 */
export function hasAllIngredients(cocktail: Cocktail, availableIngredients: string[]): boolean {
  const availableSet = new Set(availableIngredients.map(ing => ing.toLowerCase()));
  return cocktail.ingredients.every(ingredient =>
    availableSet.has(ingredient.toLowerCase())
  );
}

/**
 * Calcule le nombre d'ingrédients manquants
 */
export function getMissingIngredientsCount(cocktail: Cocktail, availableIngredients: string[]): number {
  const availableSet = new Set(availableIngredients.map(ing => ing.toLowerCase()));
  return cocktail.ingredients.filter(ingredient =>
    !availableSet.has(ingredient.toLowerCase())
  ).length;
}

/**
 * Obtient les ingrédients manquants d'un cocktail
 */
export function getMissingIngredients(cocktail: Cocktail, availableIngredients: string[]): string[] {
  const availableSet = new Set(availableIngredients.map(ing => ing.toLowerCase()));
  return cocktail.ingredients.filter(ingredient =>
    !availableSet.has(ingredient.toLowerCase())
  );
}