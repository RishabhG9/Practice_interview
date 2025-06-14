export interface Meal {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export interface MealsState {
  mealsList: Meal[];
  randomMeal: Meal | null;
  loading: {
    mealsList: boolean;
    randomMeal: boolean;
  };
  error: {
    mealsList: string | null;
    randomMeal: string | null;
  };
}
