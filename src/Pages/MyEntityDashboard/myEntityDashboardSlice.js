import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from '../../services/service';
import {MyEntitiesDashboardApiRoutes} from "../../../src/api-routes";

const initialState = {
  isLoding: false
};

export const getMyEntites = createAsyncThunk('myentitydashboard/getMyEntites', async (payload, thunkAPI) => {
  try {
    return await apiService(MyEntitiesDashboardApiRoutes.COUNTRIES, 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
export const fetchAllEntites = createAsyncThunk('myentitydashboard/fetchAllEntites', async (payload, thunkAPI) => {
  try {
    return await apiService(MyEntitiesDashboardApiRoutes.ALL_ENTITIES, 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
export const downloadReports = createAsyncThunk('myentitydashboard/downloadReports', async (payload, thunkAPI) => {
  try {
    return await apiService(MyEntitiesDashboardApiRoutes.DOWNLOAD_REPORT, 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
export const lastMonthReports = createAsyncThunk('myentitydashboard/lastMonthReports', async (payload, thunkAPI) => {
  try {
    return await apiService(MyEntitiesDashboardApiRoutes.LAST_MONTH_REPORT, 'GET');
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})
const myEntityReducer = createSlice({
  name: "myentitydashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyEntites.pending, (state) => {
        state.isLoding = true
      })
      .addCase(getMyEntites.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        state.myEntities = payload.data;
      })
      .addCase(getMyEntites.rejected, (state) => {
        state.isLoding = false
      })

      .addCase(fetchAllEntites.pending, (state) => {
        state.isLoding = true
      })
      .addCase(fetchAllEntites.fulfilled, (state, { payload }) => {
        console.log('payload payload --- >',payload.data)
        let uniqueCountries = [...new Set(payload?.data.map(entity => entity.country))];
        // let entitydatelist = [...new Set(payload?.data.map(entity => entity?.date_of_incorporation))];
        let entitydatelist =[]

        state.isLoding = false;
        state.allentites = payload.data;
        state.entitycountrylist = uniqueCountries;
        state.entitydatelist = entitydatelist;
      })
      .addCase(fetchAllEntites.rejected, (state) => {
        state.isLoding = false
      })
      .addCase(downloadReports.pending, (state) => {
        state.isLoding = true
      })
      .addCase(downloadReports.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        window.open(payload.data)
      })
      .addCase(downloadReports.rejected, (state) => {
        state.isLoding = false
      })


      .addCase(lastMonthReports.pending, (state) => {
        state.isLoding = true
      })
      .addCase(lastMonthReports.fulfilled, (state, { payload }) => {
        state.isLoding = false;
        state.headcount = payload.data.headcount;
        state.detection_rate = payload.data.detection_rate;
        state.gross_cost = payload.data.gross_cost;
        state.accuracy_rate = payload.data.accuracy_rate;
      })
      .addCase(lastMonthReports.rejected, (state) => {
        state.isLoding = false
      })

  }
});

export default myEntityReducer.reducer;
