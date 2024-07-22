import { Request, Response } from "express";
import { createOrder } from "../service/order";

export async function create(req: Request, res: Response) {
  const body = req.body;
  const { status, data } = await createOrder(body);
  res.status(201).json({ status, data });
}
