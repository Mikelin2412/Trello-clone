import { CreationOptional, DataTypes, Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

interface BoardAttributes {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ListAttributes {
  id: number;
  title: string;
  boardId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CardAttributes {
  id: number;
  title: string;
  description?: string;
  listId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BoardCreationAttributes
  extends Optional<BoardAttributes, "id" | "createdAt" | "updatedAt"> {}
interface ListCreationAttributes
  extends Optional<ListAttributes, "id" | "createdAt" | "updatedAt"> {}
interface CardCreationAttributes
  extends Optional<CardAttributes, "id" | "createdAt" | "updatedAt"> {}

@Table({
  tableName: "Boards",
  timestamps: true,
})
class BoardModel extends Model<BoardAttributes, BoardCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare title: string;

  @CreatedAt
  @Column(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column(DataTypes.DATE)
  declare updatedAt: CreationOptional<Date>;
}

@Table({
  tableName: "Lists",
  timestamps: false,
})
class ListModel extends Model<ListAttributes, ListCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare title: string;

  @CreatedAt
  @Column(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column(DataTypes.DATE)
  declare updatedAt: CreationOptional<Date>;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare boardId: number;
}

@Table({
  tableName: "Cards",
  timestamps: false,
})
class CardModel extends Model<CardAttributes, CardCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare title: string;

  @Column(DataTypes.STRING)
  declare description?: string;

  @CreatedAt
  @Column(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;

  @UpdatedAt
  @Column(DataTypes.DATE)
  declare updatedAt: CreationOptional<Date>;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare listId: number;
}

export { BoardModel, ListModel, CardModel };
