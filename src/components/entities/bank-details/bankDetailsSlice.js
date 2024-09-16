import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {EntityApiRoutes} from "../../../../src/api-routes";

const initialState = {
  bankDetails: null,
  status: "idle",
  error: null,
};

export const fetchBankDetails = createAsyncThunk(
  "bankDetails/fetchBankDetails",
  async () => {
    const response = await fetch(EntityApiRoutes.BANK_DETAILS);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const bankDetailsSlice = createSlice({
  name: "bankDetails",
  initialState,
  reducers: {
    resetBankDetails: (state) => {
      state.status = "idle";
      state.bankDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBankDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bankDetails = action.payload;
      })
      .addCase(fetchBankDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetBankDetails } = bankDetailsSlice.actions;
export default bankDetailsSlice.reducer;
