import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async (_, thunkAPI) => {
  try {
    const res = await api.get('/search.php?s=chicken');
    return res.data.meals;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch meals');
  }
});

export const fetchRandomMeal = createAsyncThunk('meals/fetchRandom', async (_, thunkAPI) => {
  try {
    const res = await api.get('/random.php');
    return res.data.meals[0]; // single object
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch meals');
  }
});
