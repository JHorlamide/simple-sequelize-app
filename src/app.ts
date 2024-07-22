import express from "express";
import cors from "cors";
import helmet from "helmet";
import {sequelize} from "./model";
import orderRoute from "./order/routes";
import dbInit from "./models/init";

dbInit();

const app = express();
const port = 9090;
const BASE_URL = "/api/v1";


app.set('models', sequelize.models);
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(`${BASE_URL}/orders`, orderRoute);

export { app, port };
