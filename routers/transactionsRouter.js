import express from "express";

const router = express.Router();

export default class TransactionsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/:userId",
      this.controller.getUserTransactions.bind(this.controller)
    );
    return router;
  }
}
