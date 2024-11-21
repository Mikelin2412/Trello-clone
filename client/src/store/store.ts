import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./slices/boardSlice";
import listReducer from "./slices/listSlice";
import cardReducer from "./slices/cardSlice";
import userLogReducer from "./slices/userLogSlice";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
    cards: cardReducer,
    userLogs: userLogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
