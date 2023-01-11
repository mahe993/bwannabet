import express from "express";

const router = express.Router();

export default class TransactionsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    return router;
  }
}
