import express from "express";

const router = express.Router();

export default class FriendsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get("/:userId/", this.controller.getFriends.bind(this.controller));
    router.delete("/", this.controller.deleteFriend.bind(this.controller));
    router.put("/", this.controller.acceptFriend.bind(this.controller));
    router.post("/", this.controller.sendFriendRequest.bind(this.controller));

    return router;
  }
}
