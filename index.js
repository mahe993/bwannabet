"use strict";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/models/index.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();

//destructure models from db
const { test } = db;

//initialize controllers, controllers passes in models
const testController = new TestController(test);

//initialize routers, routers passes in controllers, auth
const testRouter = new TestRouter(testController);

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers
app.use("/test", testRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
