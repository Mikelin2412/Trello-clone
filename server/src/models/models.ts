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
  ForeignKey,
  BelongsTo,
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
  order: number;
  listId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ActivityLogAttributes {
  id: number;
  action: string;
  boardId: number;
  createdAt?: Date;
}

interface BoardCreationAttributes
  extends Optional<BoardAttributes, "id" | "createdAt" | "updatedAt"> {}
interface ListCreationAttributes
  extends Optional<ListAttributes, "id" | "createdAt" | "updatedAt"> {}
interface CardCreationAttributes
  extends Optional<CardAttributes, "id" | "createdAt" | "updatedAt"> {}
interface ActivityLogCreationAttributes
  extends Optional<ActivityLogAttributes, "id" | "createdAt"> {}

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
  timestamps: true,
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
  timestamps: true,
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
  declare order: number;

  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare listId: number;
}

@Table({
  tableName: "ActivityLogs",
  timestamps: true,
})
class ActivityLogModel extends Model<
  ActivityLogAttributes,
  ActivityLogCreationAttributes
> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  declare id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  declare action: string;

  @AllowNull(false)
  @ForeignKey(() => BoardModel)
  @Column(DataTypes.INTEGER)
  declare boardId: number;

  @BelongsTo(() => BoardModel)
  declare board: BoardModel;

  @CreatedAt
  @Column(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;
}

export { BoardModel, ListModel, CardModel, ActivityLogModel };
