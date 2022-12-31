"use strict";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/models/index.js";
import { auth } from "express-oauth2-jwt-bearer";
import TestsController from "./controllers/testsController.js";
import TestsRouter from "./routers/testsRouter.js";
import UsersController from "./controllers/usersController.js";
import UsersRouter from "./routers/usersRouter.js";
import FriendsController from "./controllers/friendsController.js";
import FriendsRouter from "./routers/friendsRouter.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

//destructure models from db
const { test, user, friend, wallet } = db;

//initialize controllers, controllers passes in models
const testsController = new TestsController(test);
const usersController = new UsersController(user);
const friendsController = new FriendsController(friend);

//initialize routers, routers passes in controllers, auth
const testsRouter = new TestsRouter(testsController, checkJwt).routes();
const usersRouter = new UsersRouter(usersController).routes();
const friendsRouter = new FriendsRouter(friendsController).routes();

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers
app.use("/tests", testsRouter);
app.use("/users", usersRouter);
app.use("/friends", friendsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
