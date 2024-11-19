import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  createCard,
  deleteCard,
  editCard,
  getCardsForList,
} from "../../api/api";

interface Card {
  id: number;
  title: string;
  description: string;
  listId: number;
}

interface CardsState {
  cards: Card[];
  loading: boolean;
}

const initialState: CardsState = {
  cards: [],
  loading: false,
};

export const fetchCardsForList = createAsyncThunk(
  "fetchCardsForList",
  async (listId: number) => {
    const response = await getCardsForList(listId);
    return response.data;
  }
);

export const addCard = createAsyncThunk(
  "addCard",
  async (data: { title: string; listId: number }) => {
    const response = await createCard(data.title, data.listId);
    return response.data;
  }
);

export const updateCard = createAsyncThunk(
  "updateCard",
  async (data: { id: number; title?: string; description?: string }) => {
    const { id, title, description } = data;
    const response = await editCard(id, title, description);
    return response.data;
  }
);

export const removeCard = createAsyncThunk("removeCard", async (id: number) => {
  await deleteCard(id);
  return id;
});

export const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCardsForList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCardsForList.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
      })
      .addCase(fetchCardsForList.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addCard.fulfilled, (state, action) => {
        state.cards.push(action.payload);
      })

      .addCase(updateCard.fulfilled, (state, action) => {
        const updatedCard = action.payload;
        const index = state.cards.findIndex(
          (card) => card.id === updatedCard.id
        );
        if (index !== -1) {
          state.cards[index] = { ...state.cards[index], ...updatedCard };
        }
      })

      .addCase(removeCard.fulfilled, (state, action) => {
        const id = action.payload;
        state.cards = state.cards.filter((card) => card.id !== id);
      });
  },
});

export const selectCards = (state: RootState) => state.cards.cards;
export default cardSlice.reducer;
