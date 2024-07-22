import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db_connection";
import Order from "./order";

type TicketPurchasesAttributes = {
  id: number;
  status: string;
  status_message: string;
  status_reason: string;
  code: string;
  qrcode: string;

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface TicketPurchasesAttributesInput extends Optional<TicketPurchasesAttributes, 'id' | 'status_message' | 'status_reason'> { };
export interface TicketPurchasesAttributesOutput extends Required<TicketPurchasesAttributes> { };

class TicketPurchases extends Model<TicketPurchasesAttributes, TicketPurchasesAttributesOutput> implements TicketPurchasesAttributes {
  public id!: number
  public status!: string;
  public status_message!: string;
  public status_reason!: string;
  public code!: string;
  public qrcode!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

TicketPurchases.init(
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
    code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    qrcode: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true
  }
);

TicketPurchases.belongsTo(Order, { foreignKey: 'orderId' });

export default TicketPurchases