import { RootState } from "../../store/store";

export const selectMeals = (state: RootState) => state.meals.mealsList;
export const selectRandomMeal = (state: RootState) => state.meals.randomMeal;

export const selectMealsListLoading = (state: RootState) => state.meals.loading.mealsList;
export const selectRandomMealLoading = (state: RootState) => state.meals.loading.randomMeal;

export const selectMealsListError = (state: RootState) => state.meals.error.mealsList;
export const selectRandomMealError = (state: RootState) => state.meals.error.randomMeal;
