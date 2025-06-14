import { RootState } from '../../store/store';

export const selectSample = (state: RootState) => state.sample.data;
export const selectSampleLoading = (state: RootState) => state.sample.loading;
export const selectSampleError = (state: RootState) => state.sample.error;