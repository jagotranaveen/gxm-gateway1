import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {EntityApiRoutes} from "../../../../src/api-routes";
const initialState = {
  generalInformation: null,
  status: "idle",
  error: null,
};

export const fetchGeneralInformation = createAsyncThunk(
  "generalInformation/fetchGeneralInformation",
  async () => {
    const response = await fetch(EntityApiRoutes.GENERAL_INFORMATION);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const generalInformationSlice = createSlice({
  name: "generalInformation",
  initialState,
  reducers: {
    resetGeneralInformation: (state) => {
      state.status = "idle";
      state.generalInformation = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralInformation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGeneralInformation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.generalInformation = action.payload;
      })
      .addCase(fetchGeneralInformation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetGeneralInformation } = generalInformationSlice.actions;

export default generalInformationSlice.reducer;
