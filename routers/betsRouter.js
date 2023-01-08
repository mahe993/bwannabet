import express from "express";

const router = express.Router();

export default class BetsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post("/:userId", this.controller.createBet.bind(this.controller));
    router.get("/:userId", this.controller.getUserBets.bind(this.controller));

    return router;
  }
}
