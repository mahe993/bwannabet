export default class TestController {
  constructor(testModel) {
    this.testModel = testModel;
  }

  async getTest(req, res) {
    console.log("test endpoint success");
    try {
      const output = await this.testModel.findAll();
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async testImages(req, res) {
    console.log(`test images: ${req.files}`);
  }

  async testImage(req, res) {
    console.log(`test images: ${req.file}`);
  }
}
