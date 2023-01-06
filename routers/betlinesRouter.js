import express from "express";

const router = express.Router();

export default class BetlinesRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post(
      "/:userId",
      this.controller.createBetline.bind(this.controller)
    );
    router.get("/:userId", this.controller.getBetlines.bind(this.controller));

    return router;
  }
}