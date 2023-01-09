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
    router.put(
      "/verification/:winner",
      this.controller.verifyBetline.bind(this.controller)
    );
    router.get("/:userId", this.controller.getBetlines.bind(this.controller));
    router.get(
      "/details/:betlineId",
      this.controller.getSpecificBetline.bind(this.controller)
    );
    router.get(
      "/friends/:userId",
      this.controller.getFriendsBetlines.bind(this.controller)
    );

    return router;
  }
}
