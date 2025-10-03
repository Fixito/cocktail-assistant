import { useState } from '@pionjs/pion';

import { showToast } from '../components/toaster';

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

  const addCocktailToShoppingList = (cocktail: Cocktail) => {
    const newIngredients = cocktail.ingredients;
    let addedCount = 0;

    setIngredientsSet(currentSet => {
      const updatedSet = new Set(currentSet);
      const initialSize = updatedSet.size;

      newIngredients.forEach(ingredientName => {
        updatedSet.add(ingredientName.toLowerCase());
      });

      addedCount = updatedSet.size - initialSize;
      return updatedSet;
    });

    if (addedCount > 0) {
      showToast(`Added ${addedCount} new ingredient${addedCount > 1 ? 's' : ''} to shopping list`, 'success');
    } else {
      showToast(`All ingredients were already in your list`, 'info');
    }
  };

  const removeItem = (ingredient: string) => {
    setIngredientsSet(currentSet => {
      const updatedSet = new Set(currentSet);
      updatedSet.delete(ingredient.toLowerCase());
      return updatedSet;
    });

    showToast(`Removed ${ingredient} from shopping list`, 'success');
  };

  const clearShoppingList = () => {
    const itemCount = ingredientsSet.size;
    setIngredientsSet(new Set());

    if (itemCount > 0) {
      showToast(`Cleared shopping list`, 'success');
    }
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