import { Sequelize, Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes, ForeignKey, CreateDatabaseOptions } from "sequelize";

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3'
});

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>;
  declare status: "paid" | "unpaid" | "cancelled" | "payment_gateway";
  declare status_message: CreationOptional<string>;
  declare status_reason: CreationOptional<string>;
  declare user_id: string;
  declare user_firstname: string;
  declare user_lastname: string;
  declare user_email: string;
  declare user_cell: string;
  declare notification_sent: CreationOptional<string>;
  declare pdf_url: CreationOptional<string>;
  declare email_opened_at: CreationOptional<Date>;
  declare date_expires_at: CreationOptional<Date>;
  declare type: "web" | "complimentary" | "affiliate";
  declare total: number;
  declare payment: CreationOptional<JSON>;
  declare ticket_purchase_id: ForeignKey<TicketPurchase["id"]>;
  declare event_id: ForeignKey<Event["id"]>;
  declare group_id: CreationOptional<string>;
  declare affiliate_code: CreationOptional<string>;
  declare pdf_processing: CreationOptional<string>;
  declare opened_at: CreationOptional<string>;
}

class TicketPurchase extends Model<InferAttributes<TicketPurchase>, InferCreationAttributes<TicketPurchase>> {
  declare id: CreationOptional<number>;
  declare status: "paid" | "unpaid" | "cancelled" | "payment_gateway";
  declare status_message: string;
  declare status_reason: string;
  declare code: string;
  declare qrcode: string;
}

class Event extends Model<InferAttributes<Event>, InferCreationAttributes<Event>> {
  declare id: CreationOptional<number>;
  declare status: "upcoming" | "past" | "postponed" | "cancelled";
  declare name: string;
  declare quantity: number;
  declare quantity_available: number;
  declare quantity_sold: number;
  declare url: string;
  declare slug: string;
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
    sequelize,
    modelName: 'Order'
  }
);

TicketPurchase.init(
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
      allowNull: false
    },
    qrcode: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'TicketPurchase'
  }
);


Event.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: DataTypes.ENUM("upcoming", "past", "postponed", "cancelled"),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_available: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_sold: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    sequelize,
    modelName: 'Event'
  }
);

// Associations
Order.hasMany(TicketPurchase, { as: 'ticketPurchases', foreignKey: 'orderId' });
TicketPurchase.belongsTo(Order, { foreignKey: 'orderId' });

Order.belongsTo(Event, { as: "event", foreignKey: "eventId" });
Event.hasMany(Order, { as: 'orders', foreignKey: 'eventId' });

export {
  sequelize,
  Order,
  TicketPurchase,
  Event
};
