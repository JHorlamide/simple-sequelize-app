import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db_connection";
import TicketPurchases from "./ticket_purchases";
import Event from "./event";

type OrderAttributes = {
  id: number;
  status: string;
  type: string;
  total: number;
  user_id: string;
  user_firstname: string;
  user_lastname: string;
  user_email: string;
  user_cell: string;

  status_message?: string;
  status_reason?: string;
  notification_sent?: string;
  pdf_url?: string;
  email_opened_at?: Date;
  date_expires_at?: Date;
  payment?: JSON;
  group_id?: string;
  affiliate_code?: string;
  pdf_processing?: string;
  opened_at?: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface OrderInput extends Pick<OrderAttributes, 'status' | 'total' | 'type' | 'user_id' | 'user_cell' | 'user_firstname' | 'user_lastname' | 'user_email'> { };
export interface OrderOutput extends Required<OrderAttributes> { };

class Order extends Model<OrderAttributes, OrderInput> implements OrderAttributes {
  public id!: number
  public status!: string;
  public type!: string;
  public total!: number;
  public user_id!: string;
  public user_firstname!: string;
  public user_lastname!: string;
  public user_email!: string;
  public user_cell!: string;

  public status_message?: string;
  public status_reason?: string;
  public notification_sent?: string;
  public pdf_url?: string;
  public email_opened_at?: Date;
  public date_expires_at?: Date;
  public payment?: JSON;
  public group_id?: string;
  public affiliate_code?: string;
  public pdf_processing?: string;
  public opened_at?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Order.init(
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
    status_message: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status_reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_cell: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notification_sent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdf_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_opened_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('web', 'complimentary', 'affiliate'),
      allowNull: true,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    group_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    affiliate_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    pdf_processing: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    opened_at: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize
  });

  Order.hasMany(TicketPurchases, { as: 'ticketPurchases', foreignKey: 'orderId' });
  Order.belongsTo(Event, { as: "event", foreignKey: "event_id" });

export default Order