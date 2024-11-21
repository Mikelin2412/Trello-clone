import { ActivityLogModel, CardModel, ListModel } from "../models/models";

class ListService {
  static async createList(data: { title: string; boardId: number }) {
    const list = await ListModel.create(data);

    const fullListWithCards = await ListModel.findByPk(list.id, {
      include: [
        {
          model: CardModel,
          as: "cards",
        },
      ],
    });

    return fullListWithCards;
  }

  static async getListById(id: number) {
    return await ListModel.findByPk(id);
  }

  static async updateList(id: number, data: { title: string }) {
    const list = await ListModel.findByPk(id);
    if (!list) throw new Error("List not found");
    const updatedList = await list.update(data);

    await ActivityLogModel.create({
      boardId: list.boardId,
      action: `List title updated: "${list.title}"`,
    });

    return updatedList;
  }

  static async deleteList(id: number) {
    const list = await ListModel.findByPk(id);
    if (!list) throw new Error("List not found");
    await list.destroy();

    await ActivityLogModel.create({
      boardId: list.boardId,
      action: `Delete list "${list.title}"`,
    });
  }

  static async getAllCardsForList(id: number) {
    const cards = await CardModel.findAll({
      where: { listId: id },
    });
    return cards;
  }
}

export default ListService;
