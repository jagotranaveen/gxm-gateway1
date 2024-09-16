import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EntityApiRoutes } from "../../../api-routes";

const initialState = {
  personnel: null,
  status: "idle",
  error: null,
};

export const fetchPersonnel = createAsyncThunk(
  "personnel/fetchPersonnel",
  async () => {
    const response = await fetch(EntityApiRoutes.PERSONNEL);
    if (!response.ok) {
      throw new Error("Response was not ok");
    }
    const data = await response.json();
    return data;
  }
);

const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  reducers: {
    resetPersonnel: (state) => {
      state.status = "idle";
      state.personnel = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonnel.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPersonnel.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personnel = action.payload;
      })
      .addCase(fetchPersonnel.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { resetPersonnel } = personnelSlice.actions;
export default personnelSlice.reducer;
