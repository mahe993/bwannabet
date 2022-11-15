import express from "express";
import multer from "multer";

const router = express.Router();
// to parse file objects
const upload = multer();

export default class TestRouter {
  constructor(testController) {
    this.controller = testController;
  }

  routes() {
    router.get("/endpoint", this.controller.getTest.bind(this.controller));
    // for file upload endpoints, use multer array/single
    router.post(
      "/endpoint",
      upload.array("formName", 99),
      this.controller.testImages.bind(this.controller)
    );
    router.post(
      "/endpoint/single",
      upload.single("formName"),
      this.controller.testImage.bind(this.controller)
    );

    return router;
  }
}
