import express from "express"
import { create } from "./controller/order";

const router = express.Router();

/***
* @router  POST /api/v1/orders
* @desc    Create new order
* @access  Public
* @params  { object } order payload request
* ***/
router.post("/", create);

export default router;
