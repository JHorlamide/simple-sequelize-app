import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db_connection";
import Order from "./order";

type EventAttributes = {
  id: number;
  status: string;
  name: string;
  quantity: number;
  quantity_available: number;
  quantity_sold: number;
  url: string;
  slug: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface EventInput extends Optional<EventAttributes, 'id'> {};
export interface EventOutput extends Required<EventAttributes> {};

class Event extends Model<EventAttributes, EventInput> implements EventAttributes {
  public id!: number;
  public status!: string;
  public name!: string;
  public quantity!: number;
  public quantity_available!: number;
  public quantity_sold!: number;
  public url!: string;
  public slug!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM('paid', 'unpaid', 'cancelled', 'payment_gateway'),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quantity_available: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity_sold: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true
  }
);

Event.hasMany(Order, { as: 'orders', foreignKey: 'eventId' });

export default Event;