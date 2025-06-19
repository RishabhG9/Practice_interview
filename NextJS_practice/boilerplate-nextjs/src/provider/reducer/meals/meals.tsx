import { Meal, MealsState } from "@/provider/type/meals/meals";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MealsState = {
  meals: [],
  loading: false,
  error: null,
};

const mealsReducer = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setMeals: (state, action: PayloadAction<Meal[]>) => {
      state.meals = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMeals, setLoading, setError } = mealsReducer.actions;
export default mealsReducer.reducer;
