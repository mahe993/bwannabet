import db from "../db/models/index.js";
import { Sequelize } from "sequelize";

export default class BetsController {
  constructor(betModel) {
    this.betModel = betModel;
  }

  // get all bets by user
  async getUserBets(req, res) {
    try {
      const { userId } = req.params;
      const bets = await this.betModel.findAll({
        include: [
          {
            model: db.betline,
            attributes: ["betStatus", "betDescription", "betOdds"],
          },
        ],
        where: {
          userId: userId,
        },
      });

      // sort data by status
      bets.sort((a, b) => {
        if (a.betline.betStatus === "open" && b.betline.betStatus !== "open") {
          return -1;
        } else if (
          a.betline.betStatus !== "open" &&
          b.betline.betStatus === "open"
        ) {
          return 1;
        } else if (
          a.betline.betStatus === "closed" &&
          b.betline.betStatus !== "closed"
        ) {
          return -1;
        } else if (
          a.betline.betStatus !== "closed" &&
          b.betline.betStatus === "closed"
        ) {
          return 1;
        } else {
          // Sort by createdAt if betStatus is the same
          return b.createdAt - a.createdAt;
        }
      });

      res.json(bets);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // create new bet
  async createBet(req, res) {
    try {
      const { userId } = req.params;
      const { betlineId, betAmount } = req.body;
      const transaction = await db.sequelize.transaction(async (t) => {
        // create new bet
        const bet = await this.betModel.create(
          {
            ...req.body,
            userId: userId,
          },
          { transaction: t }
        );

        // new bet should update specific betline's maxbet to remove by betamount
        const betline = await db.betline.findOne(
          {
            where: {
              id: betlineId,
            },
          },
          { transaction: t }
        );

        // reduce maxBet
        const decreaseMaxBet = await betline.decrement(
          "maxBet",
          {
            by: betAmount,
          },
          { transaction: t }
        );

        // run checks
        const updatedBetline = await decreaseMaxBet.validate();

        // check if betline MaxBet is still > min bet otherwise, update status to closed
        if (updatedBetline.maxBet < updatedBetline.minBet) {
          updatedBetline.betStatus = "closed";
          await updatedBetline.save({ transaction: t });
        }

        // move bettor's wallet balance to onhold by betAmount
        const wallet = await db.wallet.findOne(
          {
            where: {
              userId: userId,
            },
          },
          { transaction: t }
        );

        // decrease wallet balance by betAmount
        const decrementOnHold = await wallet.decrement(
          "balance",
          {
            by: betAmount,
          },
          { transaction: t }
        );

        await decrementOnHold.validate();

        // increase wallet on Hold balance by betAmount
        const incrementOnHold = await wallet.increment(
          "onHold",
          {
            by: betAmount,
          },
          { transaction: t }
        );

        const final = await incrementOnHold.validate();

        // return wallet details
        return final;
      });
      res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
