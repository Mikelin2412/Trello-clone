import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ActivityLog } from "../../types/types";
import { getAllActivityLog } from "../../api/api";

interface ActivityState {
  logs: ActivityLog[];
  loading: boolean;
}

const initialState: ActivityState = {
  logs: [],
  loading: false,
};


export const fetchActivityLogs = createAsyncThunk(
  "fetchLogs",
  async (boardId: number) => {
    const response = await getAllActivityLog(boardId);
    return response.data;
  }
);

export const userLogsSlice = createSlice({
  name: "userLogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
        state.loading = false;
      })
      .addCase(fetchActivityLogs.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectAllLogs = (state: RootState) => state.userLogs;
export default userLogsSlice.reducer;
