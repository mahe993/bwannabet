import express from "express";

const router = express.Router();

export default class WalletsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post("/:userId", this.controller.postWallet.bind(this.controller));
    router.get("/:userId", this.controller.getWallet.bind(this.controller));

    return router;
  }
}
