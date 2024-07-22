import { Event } from "../../model";
import Order, { OrderInput } from "../../models/order";
import TicketPurchases from "../../models/ticket_purchases";

export async function createOrder(inputParams: OrderInput) {
  try {
    const new_order = await Order.create(inputParams);
    return {
      status: 200,
      message: "Retrieved profession successfully",
      data: new_order
    }
  } catch (error: any) {
    return { status: 500, message: error.message || "Internal Server Error." }
  }
}

export async function find(page: number, limit: number) {
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Order.findAndCountAll({
      offset,
      limit,
      include: [
        {
          model: TicketPurchases,
          as: 'ticketPurchases'
        },
        {
          model: Event,
          as: 'event'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    return {
      status: 200,
      data: {
        totalItems: count,
        totalPages: totalPages,
        currentPage: page,
        orders: rows
      }
    }
  } catch (error: any) {
    return { status: 500, message: error.message || "Internal Server Error." }
  }
}