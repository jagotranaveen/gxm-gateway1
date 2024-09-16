import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../../services/service";
import {EntityApiRoutes} from "../../../../src/api-routes";
const initialState = {
  documents: null,
  status: "idle",
  error: null,
  uploadSuccessMsg: "",
  uploadstatus: "",
  uploadErrorMsg: "",
};

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async () => {
    const response = await fetch(EntityApiRoutes.DOCUMENTS);
    if (!response.ok) {
      throw new Error("Failed to fetch documents");
    }
    const { data } = await response.json();
    return data;
  }
);

export const uploadDocuments = createAsyncThunk(
  "documents/uploadDocuments",
  async (payload, thunkAPI) => {
    try {
      return await apiService("/documents/upload-documents", "POST", {
        body: payload,
      });
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
const documentsGridSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    setDataDocument: (state, action) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetDocuments: (state) => {
      state.status = "idle";
      state.documents = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(uploadDocuments.pending, (state) => {
        state.uploadstatus = "loading";
      })
      .addCase(uploadDocuments.fulfilled, (state, action) => {
        state.uploadstatus = "success"
        state.uploadSuccessMsg = action.payload.message;
      })
      .addCase(uploadDocuments.rejected, (state, action) => {
        state.uploadstatus = "failed";
        state.uploadErrorMsg = action.error.message;
      });
  },
});

export const { resetDocuments,setDataDocument } = documentsGridSlice.actions;
export default documentsGridSlice.reducer;
