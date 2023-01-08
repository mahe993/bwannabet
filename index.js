"use strict";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/models/index.js";
import { auth } from "express-oauth2-jwt-bearer";
import UsersController from "./controllers/usersController.js";
import UsersRouter from "./routers/usersRouter.js";
import FriendsController from "./controllers/friendsController.js";
import FriendsRouter from "./routers/friendsRouter.js";
import BetlinesController from "./controllers/betlinesController.js";
import BetlinesRouter from "./routers/betlinesRouter.js";
import WalletsController from "./controllers/walletsController.js";
import WalletsRouter from "./routers/walletsRouter.js";
import BetsController from "./controllers/betsController.js";
import BetsRouter from "./routers/betsRouter.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

//destructure models from db
const { test, user, friend, wallet, betline, bet } = db;

//initialize controllers, controllers passes in models
const usersController = new UsersController(user);
const friendsController = new FriendsController(friend);
const betlinesController = new BetlinesController(betline);
const walletsController = new WalletsController(wallet);
const betsController = new BetsController(bet);

//initialize routers, routers passes in controllers, auth
const usersRouter = new UsersRouter(usersController).routes();
const friendsRouter = new FriendsRouter(friendsController).routes();
const betlinesRouter = new BetlinesRouter(betlinesController).routes();
const walletsRouter = new WalletsRouter(walletsController).routes();
const betsRouter = new BetsRouter(betsController).routes();

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers
app.use("/users", checkJwt, usersRouter);
app.use("/friends", checkJwt, friendsRouter);
app.use("/betlines", checkJwt, betlinesRouter);
app.use("/bets", checkJwt, betsRouter);
app.use("/wallets", checkJwt, walletsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
