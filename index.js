"use strict";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/models/index.js";
import { auth } from "express-oauth2-jwt-bearer";
import TestController from "./controllers/testController.js";
import TestRouter from "./routers/testRouter.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

//destructure models from db
const { test } = db;

//initialize controllers, controllers passes in models
const testController = new TestController(test);

//initialize routers, routers passes in controllers, auth
const testRouter = new TestRouter(testController, checkJwt).routes();

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
