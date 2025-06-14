import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const fetchSample = createAsyncThunk('sample/fetchSample', async (_, thunkAPI) => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Failed to fetch sample');
  }
});