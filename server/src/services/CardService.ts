import { ActivityLogModel, CardModel, ListModel } from "../models/models";

class CardService {
  static async createCard(data: {
    title: string;
    order: number;
    listId: number;
  }) {
    const card = await CardModel.create(data);

    const list = await ListModel.findByPk(data.listId);
    if (list) {
      await ActivityLogModel.create({
        boardId: list.boardId,
        action: `Card "${data.title}" was created in list ${list.title}`,
      });
    }

    return card;
  }

  static async getCardById(id: number) {
    return await CardModel.findByPk(id);
  }

  static async updateCard(
    id: number,
    data: Partial<{ title: string; description: string }>
  ) {
    const card = await CardModel.findByPk(id);
    if (!card) throw new Error("Card not found");
    const updatedCard = await card.update(data);

    const list = await ListModel.findByPk(card.listId);
    if (list) {
      await ActivityLogModel.create({
        boardId: list.boardId,
        action: `Card "${updatedCard.title}" was updated in list ${list.title}`,
      });
    }

    return updatedCard;
  }

  static async deleteCard(id: number) {
    const card = await CardModel.findByPk(id);
    if (!card) throw new Error("Card not found");
    await card.destroy();
    const list = await ListModel.findByPk(card.listId);
    if (list) {
      await ActivityLogModel.create({
        boardId: list.boardId,
        action: `Card "${card.title}" was deleted from list ${list.title}`,
      });
    }
  }
}

export default CardService;
