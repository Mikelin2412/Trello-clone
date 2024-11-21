import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Application, Express, Request, Response } from "express";
import sequelize from "./db";
import BoardService from "./services/BoardService";
import ListService from "./services/ListService";
import CardService from "./services/CardService";
import cors from "cors";
import { Op } from "sequelize";
import { ActivityLogModel, BoardModel, CardModel } from "./models/models";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);
app.use(express.json());

// Boards
app.post("/boards", async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await BoardService.createBoard(title);

  await ActivityLogModel.create({
    boardId: board.id,
    action: `User added a board: "${title}"`,
  });

  res.status(200).json(board);
});

app.get("/boards", async (req: Request, res: Response) => {
  const boards = await BoardService.getAllBoards();
  res.status(200).json(boards);
});

// get lists for current board
app.get("/boards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const lists = await BoardService.getAllListsForBoard(+id);
  res.status(200).json(lists);
});

app.put("/boards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const board = await BoardService.updateBoardTitle(Number(id), title);

  if (board) {
    await ActivityLogModel.create({
      boardId: +id,
      action: `Updated board title: "${title}"`,
    });
  }

  res.status(200).send(board);
});

app.delete("/boards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await BoardService.deleteBoard(Number(id));

  await ActivityLogModel.create({
    boardId: +id,
    action: `Delete board. Board id: "${id}"`,
  });

  res.status(200).send("Board deleted");
});

// Lists
app.post("/lists", async (req: Request, res: Response) => {
  const { title, boardId } = req.body;
  const board = await ListService.createList({ title, boardId });

  if (board) {
    await ActivityLogModel.create({
      boardId,
      action: `Added new list: "${title}"`,
    });
  }

  res.status(200).json(board);
});

app.put("/lists/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const updatedList = await ListService.updateList(Number(id), { title });
  res.status(200).json(updatedList);
});

app.delete("/lists/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await ListService.deleteList(Number(id));
  res.status(200).send("List deleted");
});

// get cards for current list
app.get("/lists/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const cards = await ListService.getAllCardsForList(+id);
  res.status(200).send(cards);
});

// Cards
app.post("/cards", async (req: Request, res: Response) => {
  const { title, order, listId } = req.body;
  const card = await CardService.createCard({ title, order, listId });
  res.status(200).json(card);
});

app.put("/cards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedCard = await CardService.updateCard(Number(id), {
    title,
    description,
  });
  res.status(200).send(updatedCard);
});

app.patch("/cards/changeOrder", async (req: Request, res: Response) => {
  const { cardId, targetOrder, listId } = req.body;

  const card = await CardModel.findByPk(cardId);

  if (card) {
    card.order = targetOrder;
    await card.save();
  }

  await CardModel.update(
    { order: sequelize.literal("order + 1") },
    {
      where: {
        listId,
        id: { [Op.ne]: cardId },
        order: { [Op.gte]: targetOrder },
      },
    }
  );

  res.status(200).send(card);
});

app.delete("/cards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await CardService.deleteCard(Number(id));
  res.status(200).send("Card deleted");
});

app.get("/boards/:boardId/activity", async (req: Request, res: Response) => {
  const { boardId } = req.params;

  try {
    const logs = await ActivityLogModel.findAll({
      where: { boardId },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity logs" });
  }
});

// app.post("/activity", async (req: Request, res: Response) => {
//   const { boardId, action } = req.body;

//   try {
//     const board = await BoardModel.findByPk(boardId);

//     if (!board) {
//       res.status(404).json({ error: "Board not found" });
//       return;
//     }

//     const log = await ActivityLogModel.create({ boardId, action });
//     res.status(201).json(log);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to create activity log" });
//   }
// });

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (e) {
    console.log(
      `There is an error occurred while connecting to the database: ` + e
    );
  }
};

startServer();
