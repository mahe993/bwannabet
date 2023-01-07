import db from "../db/models/index.js";

export default class WalletsController {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  // top up a specific user's wallet
  async topUpWallet(req, res) {
    try {
      const { userId } = req.params;
      const transaction = await db.sequelize.transaction(async (t) => {
        const wallet = await this.walletModel.findOne(
          {
            where: {
              userId: userId,
            },
          },
          { transaction: t }
        );

        const increment = await wallet.increment("balance", {
          by: req.body.balance,
          transaction: t,
        });

        const validate = await increment.validate();
        return validate;
      });
      res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async withdrawWallet(req, res) {
    try {
      const { userId } = req.params;
      const transaction = await db.sequelize.transaction(async (t) => {
        const wallet = await this.walletModel.findOne(
          {
            where: {
              userId: userId,
            },
          },
          { transaction: t }
        );

        const decrement = await wallet.decrement("balance", {
          by: req.body.balance,
          transaction: t,
        });

        const validate = await decrement.validate();
        return validate;
      });
      res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // find or create a specific user's wallet
  async getWallet(req, res) {
    try {
      const { userId } = req.params;
      const [wallet, created] = await this.walletModel.findOrCreate({
        where: { userId: userId },
        defaults: { balance: 0 },
      });
      res.json(wallet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
