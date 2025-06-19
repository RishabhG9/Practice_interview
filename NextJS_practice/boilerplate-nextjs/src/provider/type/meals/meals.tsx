export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealsState {
  loading: boolean;
  meals: Meal[];
  error: string | null;
}
