import { useState } from '@pionjs/pion';

import type { Cocktail } from '../types/cocktail';

export interface ShoppingListItem {
  ingredient: string;
}

interface UseShoppingListReturn {
  items: ShoppingListItem[];
  addCocktailToShoppingList: (cocktail: Cocktail) => void;
  removeItem: (ingredient: string) => void;
  clearShoppingList: () => void;
}

export function useShoppingList(): UseShoppingListReturn {
  const [ingredientsSet, setIngredientsSet] = useState<Set<string>>(new Set());

  const extractIngredients = (cocktail: Cocktail): string[] => {
    const ingredients: string[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail] as string;

      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient.trim());
      }
    }

    return ingredients;
  };

  const addCocktailToShoppingList = (cocktail: Cocktail) => {
    const newIngredients = extractIngredients(cocktail);

    setIngredientsSet(currentSet => {
      const updatedSet = new Set(currentSet);

      newIngredients.forEach(ingredientName => {
        updatedSet.add(ingredientName.toLowerCase());
      });

      return updatedSet;
    });
  };

  const removeItem = (ingredient: string) => {
    setIngredientsSet(currentSet => {
      const updatedSet = new Set(currentSet);
      updatedSet.delete(ingredient.toLowerCase());
      return updatedSet;
    });
  };

  const clearShoppingList = () => {
    setIngredientsSet(new Set());
  };

  const items: ShoppingListItem[] = Array.from(ingredientsSet).map(ingredient => ({
    ingredient: ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
  }));

  return {
    items,
    addCocktailToShoppingList,
    removeItem,
    clearShoppingList
  };
}