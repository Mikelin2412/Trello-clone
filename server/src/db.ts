import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { BoardModel, ListModel, CardModel } from "./models/models";

export default new Sequelize({
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  models: [BoardModel, ListModel, CardModel],
});

BoardModel.hasMany(ListModel, {
  foreignKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ListModel.belongsTo(BoardModel, {
  foreignKey: "boardId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

ListModel.hasMany(CardModel, {
  foreignKey: "listId",
  as: "cards",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
CardModel.belongsTo(ListModel, {
  foreignKey: "listId",
  as: "list",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
