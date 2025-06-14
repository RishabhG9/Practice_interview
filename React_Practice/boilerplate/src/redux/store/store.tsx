import sampleReducer from '../reducer/sample/sample_reducer';
import { configureStore } from '@reduxjs/toolkit';
import mealsReducer from '../reducer/meals/meals_reducer';


export const store = configureStore({
  reducer: {
    meals: mealsReducer,
    sample: sampleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
