import db from "../db/models/index.js";

export default class BetlinesController {
  constructor(betlineModel) {
    this.betlineModel = betlineModel;
  }

  // create new betline
  async createBetline(req, res) {
    try {
      const { userId } = req.params;
      const { maxBet, betOdds } = req.body;
      const transaction = await db.sequelize.transaction(async (t) => {
        const betline = await this.betlineModel.create(
          {
            ...req.body,
            userId: userId,
          },
          { transaction: t }
        );

        const wallet = await db.wallet.findOne(
          {
            where: {
              userId: betline.userId,
            },
          },
          { transaction: t }
        );

        // reduce wallet balance by maxBet
        const decrement = await wallet.decrement("balance", {
          by: maxBet * betOdds,
          transaction: t,
        });

        // increase wallet on Hold balance by maxBet
        const increment = await wallet.increment("onHold", {
          by: maxBet * betOdds,
          transaction: t,
        });

        await decrement.validate();
        const final = await increment.validate();

        // return wallet
        return final;
      });
      res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // get all betlines by user
  async getBetlines(req, res) {
    try {
      const { userId } = req.params;
      const betlines = await this.betlineModel.findAll({
        // eagerload user email and username
        where: {
          userId: userId,
        },
      });

      // sort data by status
      betlines.sort((a, b) => {
        if (a.betStatus === "open" && b.betStatus !== "open") {
          return -1;
        } else if (a.betStatus !== "open" && b.betStatus === "open") {
          return 1;
        } else if (a.betStatus === "closed" && b.betStatus !== "closed") {
          return -1;
        } else if (a.betStatus !== "closed" && b.betStatus === "closed") {
          return 1;
        } else {
          // Sort by createdAt if betStatus is the same
          return b.createdAt - a.createdAt;
        }
      });

      res.json(betlines);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
