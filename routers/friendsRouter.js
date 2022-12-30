import express from "express";

const router = express.Router();

export default class FriendsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/:userId/", this.controller.getFriends.bind(this.controller));

    return router;
  }
}
