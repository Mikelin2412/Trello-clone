import { CardModel } from "../models/models";

class CardService {
  static async createCard(data: {
    title: string;
    description: string;
    listId: number;
  }) {
    return await CardModel.create(data);
  }

  static async getAllCards() {
    return await CardModel.findAll();
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
    return await card.update(data);
  }

  static async deleteCard(id: number) {
    const card = await CardModel.findByPk(id);
    if (!card) throw new Error("Card not found");
    await card.destroy();
  }
}

export default CardService;
