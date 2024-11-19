import { CardModel } from "../models/models";

class CardService {
  static async createCard(data: {
    title: string;
    listId: number;
  }) {
    return await CardModel.create(data);
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
    return updatedCard;
  }

  static async deleteCard(id: number) {
    const card = await CardModel.findByPk(id);
    if (!card) throw new Error("Card not found");
    await card.destroy();
  }
}

export default CardService;
