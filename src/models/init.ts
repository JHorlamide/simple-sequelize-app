import Event from "./event"
import Order from "./order"
import TicketPurchases from "./ticket_purchases"

const dbInit = () => Promise.all([
  Event.sync({ alter: true }),
  Order.sync({ alter: true }),
  TicketPurchases.sync({ alter: true }),
])

export default dbInit;