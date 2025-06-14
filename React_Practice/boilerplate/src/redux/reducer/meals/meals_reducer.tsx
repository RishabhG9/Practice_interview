import { createSlice } from '@reduxjs/toolkit';
import { fetchMeals, fetchRandomMeal } from '../../action/meals/meals_action';
import { MealsState } from '../../types/meals/meals_type';


const initialState: MealsState = {
  mealsList: [],
  randomMeal: null,
  loading: {
    mealsList: false,
    randomMeal: false,
  },
  error: {
    mealsList: null,
    randomMeal: null,
  },
};


const mealsReducer = createSlice({
  name: 'meals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All Meals List
      .addCase(fetchMeals.pending, (state) => {
        state.loading.mealsList = true;
        state.error.mealsList = null;
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.loading.mealsList = false;
        state.mealsList = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.loading.mealsList = false;
        state.error.mealsList = action.payload as string;
      })

      // Random Meal
      .addCase(fetchRandomMeal.pending, (state) => {
        state.loading.randomMeal = true;
        state.error.randomMeal = null;
      })
      .addCase(fetchRandomMeal.fulfilled, (state, action) => {
        state.loading.randomMeal = false;
        state.randomMeal = action.payload;
      })
      .addCase(fetchRandomMeal.rejected, (state, action) => {
        state.loading.randomMeal = false;
        state.error.randomMeal = action.payload as string;
      });
  },
});

export default mealsReducer.reducer;
