import db from "../db/models/index.js";

export default class WalletsController {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  // top up a specific user's wallet
  async topUpWallet(req, res) {
    try {
      const { userId } = req.params;
      const { balance } = req.body;
      const transaction = await db.sequelize.transaction(async (t) => {
        const wallet = await this.walletModel.findOne(
          {
            where: {
              userId: userId,
            },
          },
          { transaction: t }
        );

        const increment = await wallet.increment(
          "balance",
          {
            by: balance,
          },
          { transaction: t }
        );

        const validate = await increment.validate();

        await db.transaction.create(
          {
            userId: userId,
            type: "Top Up",
            amount: balance,
            description: `Funded account balance with $${balance.toFixed(2)}`,
          },
          { transaction: t }
        );

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
      const { balance } = req.body;
      const transaction = await db.sequelize.transaction(async (t) => {
        const wallet = await this.walletModel.findOne(
          {
            where: {
              userId: userId,
            },
          },
          { transaction: t }
        );

        const decrement = await wallet.decrement(
          "balance",
          {
            by: balance,
          },
          { transaction: t }
        );

        const validate = await decrement.validate();

        await db.transaction.create(
          {
            userId: userId,
            type: "Withdrawal",
            amount: balance,
            description: `Withdraw from account balance $${balance.toFixed(2)}`,
          },
          { transaction: t }
        );

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
      const { userId, email } = req.params;

      // ensure user exists first
      const [user, unused] = await db.user.findOrCreate({
        where: { id: userId },
        defaults: { email: email },
      });

      //create wallet
      const [wallet, unusedTwo] = await this.walletModel.findOrCreate({
        where: { userId: userId },
        defaults: { balance: 0, onHold: 0 },
      });
      res.json(wallet);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
