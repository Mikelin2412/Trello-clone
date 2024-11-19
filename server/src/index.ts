import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import sequelize from "./db";
import BoardService from "./services/BoardService";
import ListService from "./services/ListService";
import CardService from "./services/CardService";
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: process.env.CLIENT_HOST,
    methods: ["GET", "POST", "PUT", "DELETE"],
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
  res.status(200).send(board);
});

app.delete("/boards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await BoardService.deleteBoard(Number(id));
  res.status(200).send("Board deleted");
});

// Lists
app.post("/lists", async (req: Request, res: Response) => {
  const { title, boardId } = req.body;
  const board = await ListService.createList({ title, boardId });
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
  const { title, listId } = req.body;
  const board = await CardService.createCard({ title, listId });
  res.status(200).json(board);
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

app.delete("/cards/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await CardService.deleteCard(Number(id));
  res.status(200).send("Card deleted");
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
