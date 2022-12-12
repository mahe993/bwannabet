import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

export default class UsersRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.post(
      "/:userId/profilepic",
      upload.single("picture"),
      this.controller.postProfilePic.bind(this.controller)
    );
    return router;
  }
}
