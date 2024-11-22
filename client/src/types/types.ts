export const ItemTypes = {
  CARD: "card",
};

export interface CardType {
  id: number;
  order: number;
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

export interface ActivityLog {
  id: number;
  action: string;
  createdAt: string;
}