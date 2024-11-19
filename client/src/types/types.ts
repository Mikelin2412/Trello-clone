export const ItemTypes = {
  CARD: "card",
  LIST: "list",
};

export interface CardType {
  id: number;
  title: string;
  description: string;
  listId: number;
}

export interface ListType {
  id: number;
  title: string;
  boardId: string;
  cards: CardType[];
}

export interface Board {
  id: number;
  title: string;
}