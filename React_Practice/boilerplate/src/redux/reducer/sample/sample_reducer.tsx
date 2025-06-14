import { createSlice } from '@reduxjs/toolkit';
import { fetchSample } from '../../action/sample/sample_action';
import { SampleState } from '../../types/sample/sample_types';

const initialState: SampleState = {
  data: [],
  loading: false,
  error: null,
};

const sampleReducer = createSlice({
  name: 'sample',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSample.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSample.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sampleReducer.reducer;