import axios from "axios";
import { ListType } from "../types/types";

const axiosApi = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3000",
});

// GET REQUESTS
export const getAllBoards = () => axiosApi.get("/boards");
export const getListsForBoard = (boardId: number) =>
  axiosApi.get(`/boards/${boardId}`);
export const getCardsForList = (listId: number) =>
  axiosApi.get(`/lists/${listId}`);
export const getAllActivityLog = (boardId: number) =>
  axiosApi.get(`/boards/${boardId}/activity`);

// POST REQUESTS
export const createBoard = (title: string) =>
  axiosApi.post("/boards", { title });
export const createList = (title: string, boardId: number) =>
  axiosApi.post("/lists", { title, boardId });
export const createCard = (title: string, order: number, listId: number) =>
  axiosApi.post("/cards", { title, order, listId });

// PUT REQUESTS
export const editBoardTitle = (boardId: number, title: string) =>
  axiosApi.put(`/boards/${boardId}`, { title });
export const editListTitle = (listId: number, title: string) =>
  axiosApi.put(`/lists/${listId}`, { title });
export const editCard = (
  cardId: number,
  title?: string,
  description?: string
) => axiosApi.put(`/cards/${cardId}`, { title, description });
export const reorderListsApi = (lists: Omit<ListType, "boardId">[]) =>
  axiosApi.put(`/changeCardsOrder`, {
    lists,
  });

// DELETE REQUESTS
export const deleteBoard = (boardId: number) =>
  axiosApi.delete(`/boards/${boardId}`);
export const deleteList = (listId: number) =>
  axiosApi.delete(`/lists/${listId}`);
export const deleteCard = (cardId: number) =>
  axiosApi.delete(`/cards/${cardId}`);
