import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  createCard,
  createList,
  deleteCard,
  deleteList,
  editCard,
  editListTitle,
  getListsForBoard,
  reorderCardApi,
} from "../../api/api";
import { CardType } from "../../types/types";

interface List {
  id: number;
  title: string;
  cards: CardType[];
}

interface ListState {
  lists: List[];
  loading: boolean;
}

const initialState: ListState = {
  lists: [],
  loading: false,
};

export const fetchListsForBoard = createAsyncThunk(
  "fetchListsForBoard",
  async (boardId: number) => {
    const response = await getListsForBoard(boardId);
    return response.data;
  }
);

export const addCardToList = createAsyncThunk(
  "addCardToList",
  async ({
    title,
    order,
    listId,
  }: {
    title: string;
    order: number;
    listId: number;
  }) => {
    const response = await createCard(title, order, listId);
    return { card: response.data, listId };
  }
);

export const addNewList = createAsyncThunk(
  "addNewList",
  async ({ title, boardId }: { title: string; boardId: number }) => {
    const response = await createList(title, boardId);
    return response.data;
  }
);

export const updateListTitle = createAsyncThunk(
  "updateListTitle",
  async ({ id, title }: { id: number; title: string }) => {
    const response = await editListTitle(id, title);
    return response.data;
  }
);

export const removeList = createAsyncThunk("deleteList", async (id: number) => {
  await deleteList(id);
  return id;
});

export const updateCard = createAsyncThunk(
  "updateCard",
  async ({
    cardId,
    title,
    description,
  }: {
    cardId: number;
    title: string;
    description: string;
  }) => {
    const response = await editCard(cardId, title, description);
    return response.data;
  }
);

export const removeCard = createAsyncThunk(
  "removeCard",
  async (cardId: number) => {
    await deleteCard(cardId);
    return cardId;
  }
);

export const reorderCard = createAsyncThunk(
  "reorderCard",
  async ({
    cardId,
    targetOrder,
    listId,
  }: {
    cardId: number;
    targetOrder: number;
    listId: number;
  }) => {
    const response = await reorderCardApi(cardId, targetOrder, listId);
    return response.data;
  }
);

export const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    moveCardToAnotherList: (
      state,
      action: PayloadAction<{
        cardId: number;
        sourceListId: number;
        targetListId: number;
        targetIndex: number,
      }>
    ) => {
      const { cardId, sourceListId, targetListId, targetIndex } =
        action.payload;

      const sourceList = state.lists.find((list) => list.id === sourceListId);
      const targetList = state.lists.find((list) => list.id === targetListId);
      if (!sourceList || !targetList) return;

      const cardIndex = sourceList.cards.findIndex(
        (card) => card.id === cardId
      );
      if (cardIndex === -1) return;
      const [movedCard] = sourceList.cards.splice(cardIndex, 1);

      movedCard.listId = targetListId;

      targetList.cards.splice(targetIndex, 0, movedCard);
    },
    reorderCardsByHover: (
      state,
      action: PayloadAction<{
        dragIndex: number;
        hoverIndex: number;
        listId: number;
      }>
    ) => {
      const { dragIndex, hoverIndex, listId } = action.payload;

      const editedList = state.lists.find((list) => list.id === listId);

      if (!editedList) return;

      const editedCards = [...editedList.cards];
      const [movedCard] = editedCards.splice(dragIndex, 1);
      editedCards.splice(hoverIndex, 0, movedCard);
      editedList.cards = editedCards;
    },
    changeCardsOrderValues: (state) => {
      state.lists.forEach((list) => {
        list.cards = list.cards.map((card, index) => ({
          ...card,
          order: index,
        }));
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListsForBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListsForBoard.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(fetchListsForBoard.rejected, (state) => {
        state.loading = false;
      })

      .addCase(addCardToList.fulfilled, (state, action) => {
        const { card, listId } = action.payload;
        const list = state.lists.find((list) => list.id === listId);
        if (list) {
          list.cards.push(card);
        }
      })

      .addCase(updateCard.fulfilled, (state, action) => {
        const updatedCard = action.payload;
        state.lists.forEach((list) => {
          const card = list.cards.find((c) => c.id === updatedCard.id);
          if (card) {
            if (updatedCard.title) card.title = updatedCard.title;
            if (updatedCard.description)
              card.description = updatedCard.description;
          }
        });
      })

      .addCase(addNewList.fulfilled, (state, action) => {
        state.lists.push(action.payload);
      })

      .addCase(updateListTitle.fulfilled, (state, action) => {
        const updatedList = action.payload;
        const index = state.lists.findIndex(
          (list) => list.id === updatedList.id
        );
        if (index !== -1) {
          state.lists[index].title = updatedList.title;
        }
      })

      .addCase(reorderCard.fulfilled, (state, action) => {
        const updatedCard = action.payload;
        const list = state.lists.find((list) => list.id === updatedCard.listId);
        if (list) {
          list.cards = list.cards
            .map((card) => (card.id === updatedCard.id ? updatedCard : card))
            .sort((a, b) => a.order - b.order);
        }
      })

      .addCase(removeList.fulfilled, (state, action) => {
        const id = action.payload;
        state.lists = state.lists.filter((list) => list.id !== id);
      })

      .addCase(removeCard.fulfilled, (state, action) => {
        const cardId = action.payload;
        state.lists.forEach((list) => {
          list.cards = list.cards.filter((card) => card.id !== cardId);
        });
      });
  },
});

export const {
  moveCardToAnotherList,
  reorderCardsByHover,
  changeCardsOrderValues,
} = listsSlice.actions;
export const selectLists = (state: RootState) => state.lists.lists;
export const selectListLoading = (state: RootState) => state.lists.loading;
export default listsSlice.reducer;
