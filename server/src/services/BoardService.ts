import { BoardModel } from "../models/models";

class BoardService {
  static async createBoard(title: string): Promise<BoardModel> {
    const board = await BoardModel.create({ title });
    return board;
  }

  static async getAllBoards(): Promise<BoardModel[]> {
    const boards = await BoardModel.findAll();
    return boards;
  }

  static async getBoardById(id: number): Promise<BoardModel | null> {
    const board = await BoardModel.findByPk(id);
    if (!board) {
      console.log("Board not found!");
    }
    return board;
  }

  static async updateBoardTitle(
    id: number,
    newTitle: string
  ): Promise<BoardModel | null> {
    const board = await BoardModel.findByPk(id);
    if (!board) {
      console.log("Board not found!");
      return null;
    }
    board.title = newTitle;
    await board.save();
    return board;
  }

  static async deleteBoard(id: number): Promise<BoardModel | null> {
    const board = await BoardModel.findByPk(id);
    if (!board) {
      console.log("Board not found");
      return null;
    }
    await board.destroy();
    return board;
  }
}

export default BoardService;
