import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

export default class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/getuser/:userId/:email",
      this.controller.getUser.bind(this.controller)
    );
    router.get(
      "/search/:userId/:query",
      this.controller.searchUsers.bind(this.controller)
    );
    router.put(
      "/:userId/details",
      this.controller.updateDetails.bind(this.controller)
    );
    router.post(
      "/:userId/profilepic",
      upload.single("picture"),
      this.controller.postProfilePic.bind(this.controller)
    );
    return router;
  }
}
