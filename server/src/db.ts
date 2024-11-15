import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default new Sequelize({
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT as Dialect,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
