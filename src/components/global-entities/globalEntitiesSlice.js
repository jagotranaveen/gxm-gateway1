import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MyEntitiesDashboardApiRoutes } from '../../api-routes';

export const fetchGlobalEntityDetails = createAsyncThunk(
  'globalEntities/fetchDetails',
  async () => {
    const response = await fetch(MyEntitiesDashboardApiRoutes.ALL_ENTITIES);
    if (!response.ok) {
      throw new Error('Failed to fetch global entity details');
    }
    const data = await response.json();
    return data.data;
  }
);

const globalEntitiesSlice = createSlice({
  name: 'globalEntities',
  initialState: {
    entities: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalEntityDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGlobalEntityDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(fetchGlobalEntityDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default globalEntitiesSlice.reducer;
