import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { Board } from "../../types/types";
import {
  createBoard,
  deleteBoard,
  editBoardTitle,
  getAllBoards,
} from "../../api/api";

interface BoardState {
  boards: Board[];
  selectedBoard: Board | null;
  loading: boolean;
}

const initialState: BoardState = {
  boards: [],
  selectedBoard: null,
  loading: false,
};

export const fetchAllBoards = createAsyncThunk("fetchAllBoard", async () => {
  const response = await getAllBoards();
  return response.data;
});

export const addBoard = createAsyncThunk("addBoard", async (title: string) => {
  const response = await createBoard(title);
  return response.data;
});

export const editBoard = createAsyncThunk(
  "editBoardTitle",
  async ({ id, title }: { id: number; title: string }) => {
    const response = await editBoardTitle(id, title);
    return response.data;
  }
);

export const removeBoard = createAsyncThunk(
  "removeBoard",
  async (id: number) => {
    await deleteBoard(id);
    return id;
  }
);

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setSelectedBoard: (state, action) => {
      return { ...state, selectedBoard: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBoards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllBoards.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addBoard.fulfilled, (state, action) => {
        state.boards.push(action.payload);
      })

      .addCase(editBoard.fulfilled, (state, action) => {
        const updatedBoard = action.payload;
        const index = state.boards.findIndex(
          (board) => board.id === updatedBoard.id
        );
        if (index !== -1) {
          state.boards[index].title = updatedBoard.title;
        }
      })

      .addCase(removeBoard.fulfilled, (state, action) => {
        state.boards = state.boards.filter(
          (board) => board.id !== action.payload
        );
      });
  },
});

export const { setSelectedBoard } = boardSlice.actions;
export const selectBoards = (state: RootState) => state.boards;
export const getSelectedBoard = (state: RootState) =>
  state.boards.selectedBoard;
export default boardSlice.reducer;
