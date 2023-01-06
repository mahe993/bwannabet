import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

export default class WalletRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes() {
    router.get(
      "/:userId/wallet",
      this.controller.getUser.bind(this.controller)
    );
    router.put(
      "/:userId/wallet",
      this.controller.updateDetails.bind(this.controller)
    );
    return router;
  }
}
