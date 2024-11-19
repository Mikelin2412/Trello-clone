import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserLog {
  message: string;
}

const initialState: UserLog[] = [];

export const userLogsSlice = createSlice({
  name: "userLogs",
  initialState,
  reducers: {
    addNewLog: (state: UserLog[], action: PayloadAction<UserLog>) => {
      state.push(action.payload);
    },
  },
});

export const { addNewLog } = userLogsSlice.actions;
export const selectAllLogs = (state: RootState) => state;
export default userLogsSlice.reducer;
