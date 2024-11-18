import { ListModel } from "../models/models";

class ListService {
  static async createList(data: { title: string; boardId: number }) {
    return await ListModel.create(data);
  }

  static async getAllLists() {
    return await ListModel.findAll();
  }

  static async getListById(id: number) {
    return await ListModel.findByPk(id);
  }

  static async updateList(id: number, data: Partial<{ title: string }>) {
    const list = await ListModel.findByPk(id);
    if (!list) throw new Error("List not found");
    return await list.update(data);
  }

  static async deleteList(id: number) {
    const list = await ListModel.findByPk(id);
    if (!list) throw new Error("List not found");
    await list.destroy();
  }
}

export default ListService;
