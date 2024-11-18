import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import sequelize from "./db";
import BoardService from "./services/BoardService";
import ListService from "./services/ListService";
import CardService from "./services/CardService";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// Boards
app.post("/boards", async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await BoardService.createBoard(title);
  res.json(board);
});

app.get("/boards", async (req: Request, res: Response) => {
  const boards = await BoardService.getAllBoards();
  res.json(boards);
});

app.put("/boards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  const board = await BoardService.updateBoardTitle(Number(id), title);
  res.send(board);
});

app.delete("/boards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await BoardService.deleteBoard(Number(id));
  res.send("Board deleted");
});

// Lists
app.post("/lists", async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await ListService.createList(title);
  res.json(board);
});

app.get("/lists", async (req: Request, res: Response) => {
  const boards = await ListService.getAllLists();
  res.json(boards);
});

app.put("/lists/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  await ListService.updateList(Number(id), title);
  res.send("List updated");
});

app.delete("/lists/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await ListService.deleteList(Number(id));
  res.send("List deleted");
});

// Cards
app.post("/cards", async (req: Request, res: Response) => {
  const { title } = req.body;
  const board = await CardService.createCard(title);
  res.json(board);
});

app.get("/cards", async (req: Request, res: Response) => {
  const boards = await CardService.getAllCards();
  res.json(boards);
});

app.put("/cards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  await CardService.updateCard(Number(id), title);
  res.send("Card updated");
});

app.delete("/cards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await CardService.deleteCard(Number(id));
  res.send("Card deleted");
});

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
