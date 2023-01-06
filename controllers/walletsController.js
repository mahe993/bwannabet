export default class WalletsController {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  // do something for postWallet route
  async postWallet(req, res) {
    try {
      console.log("working");
      const { userId } = req.params;
      // const wallet = await this.walletModel.create(); // do whatever you like here
      res.json(wallet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // do something for getWallet route
  async getWallet(req, res) {
    console.log("working");
    try {
      const { userId } = req.params;
      // const wallet = await this.walletModel.findAll(); // do whatever you like here
      res.json(wallet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
