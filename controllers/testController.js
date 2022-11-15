export default class TestController {
  constructor(testModel) {
    this.testModel = testModel;
  }

  async getTest(res, req) {
    console.log("test endpoint success");
  }

  async testImages(res, req) {
    console.log(`test images: ${req.files}`);
  }

  async testImage(res, req) {
    console.log(`test images: ${req.file}`);
  }
}
