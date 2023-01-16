import db from "../db/models/index.js";
import { Sequelize } from "sequelize";

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
        const toHold = maxBet * betOdds - maxBet;
        const betline = await this.betlineModel.create(
          {
            ...req.body,
            userId: userId,
            holdingAmount: toHold,
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
        const decrement = await wallet.decrement(
          "balance",
          {
            by: toHold,
          },
          { transaction: t }
        );

        // increase wallet on Hold balance by maxBet
        const increment = await wallet.increment(
          "onHold",
          {
            by: toHold,
          },
          { transaction: t }
        );

        await decrement.validate();
        const final = await increment.validate();

        await db.transaction.create(
          {
            userId: userId,
            betlineId: betline.id,
            type: "Betline",
            amount: -toHold,
            description: `Created betline (ref no. #${userId.slice(-5)}-${
              betline.id
            })`,
          },
          { transaction: t }
        );

        // return wallet
        return final;
      });
      res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // get specific betline
  async getSpecificBetline(req, res) {
    try {
      const { betlineId } = req.params;

      const betline = await this.betlineModel.findByPk(betlineId, {
        // eagerload user email and username
        include: [
          {
            model: db.user,
            attributes: ["email", "username"],
          },
          {
            model: db.bet,
            attributes: ["betAmount", "id"],
            include: [
              {
                model: db.user,
                attributes: ["email", "username"],
              },
            ],
          },
        ],
      });

      //update betline to closed if past closing time
      if (
        betline &&
        betline.closingTime < new Date() &&
        betline.betStatus === "open"
      ) {
        await this.betlineModel.update(
          { betStatus: "closed" },
          { where: { id: betlineId } }
        );

        const reload = await this.betlineModel.findByPk(betlineId, {
          // eagerload user email and username
          include: [
            {
              model: db.user,
              attributes: ["email", "username"],
            },
            {
              model: db.bet,
              attributes: ["betAmount", "id"],
              include: [
                {
                  model: db.user,
                  attributes: ["email", "username"],
                },
              ],
            },
          ],
        });
        res.json(reload);
      }

      res.json(betline);
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
        include: [
          {
            model: db.user,
            attributes: ["email", "username"],
          },
        ],
        where: {
          userId: userId,
        },
      });

      // loop through betlines and check closingTime and betStatus
      const checkedStatus = betlines.map(async (betline) => {
        if (betline.closingTime < new Date() && betline.betStatus === "open") {
          await this.betlineModel.update(
            { betStatus: "closed" },
            { where: { id: betline.id } }
          );
        }
        const reload = await this.betlineModel.findByPk(betline.id, {
          // eagerload user email and username
          include: [
            {
              model: db.user,
              attributes: ["email", "username"],
            },
          ],
        });
        return reload;
      });

      const resolved = await Promise.all(checkedStatus);

      // sort data by status
      resolved.sort((a, b) => {
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

      res.json(resolved);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // get all betlines by user's friends
  async getFriendsBetlines(req, res) {
    try {
      const { userId } = req.params;

      const friends = await db.friend.findAll({
        where: {
          status: "accepted",
          [Sequelize.Op.or]: [{ requestee: userId }, { requestor: userId }],
        },
      });

      // if no accepted friends, early return
      if (friends.length === 0) return res.json(friends);

      // get all betlines created by friends, eager load their usernames/email
      const betlines = await this.betlineModel.findAll({
        include: { model: db.user, attributes: ["username", "email"] },
        where: {
          userId: {
            [Sequelize.Op.in]: friends.map((friend) =>
              friend.requestee === userId ? friend.requestor : friend.requestee
            ),
          },
          betStatus: "open",
        },
        order: [["createdAt", "DESC"]],
      });

      // loop through betlines and check closingTime and betStatus
      const checkedStatus = betlines.map(async (betline) => {
        if (betline.closingTime < new Date() && betline.betStatus === "open") {
          await this.betlineModel.update(
            { betStatus: "closed" },
            { where: { id: betline.id } }
          );
        }
        const reload = await this.betlineModel.findByPk(betline.id, {
          // eagerload user email and username
          include: [
            {
              model: db.user,
              attributes: ["email", "username"],
            },
          ],
        });
        return reload;
      });

      const resolved = await Promise.all(checkedStatus);

      res.json(resolved);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // verify betline
  async verifyBetline(req, res) {
    try {
      const { winner } = req.params;
      const { betlineId } = req.body;
      let winLossAmount = 0;
      const transaction = await db.sequelize.transaction(async (t) => {
        // search all bets that has this betline id
        const bets = await db.bet.findAll(
          {
            where: {
              betlineId: betlineId,
            },
          },
          { transaction: t }
        );

        // get the betline
        const betline = await this.betlineModel.findByPk(betlineId, {
          transaction: t,
        });

        // for each bet, reduce bet's userId's wallet onHold by betAmount.
        const arr = bets.map(async (bet) => {
          await db.wallet.decrement(
            "onHold",
            {
              by: bet.betAmount,
              where: {
                userId: bet.userId,
              },
            },
            { transaction: t }
          );
          // if winner === house, add to constant
          if (winner === "house") {
            winLossAmount += bet.betAmount;

            // add to each player's transaction
            await db.transaction.create(
              {
                userId: bet.userId,
                betId: bet.id,
                betlineId: betlineId,
                type: "Bet",
                amount: -bet.betAmount,
                description: `Lost bet (ref no. #${bet.userId.slice(9, 13)}-${
                  bet.id
                }) on betline (ref no. #${bet.userId.slice(-5)}-${betline.id})`,
              },
              { transaction: t }
            );
          } else if (winner === "player") {
            // if winner === player, increase bet's userId's wallet balance by betAmount*betOdds and decrease constant
            const winnings = bet.betAmount * betline.betOdds;
            await db.wallet.increment(
              "balance",
              {
                by: winnings,
                where: {
                  userId: bet.userId,
                },
              },
              { transaction: t }
            );

            winLossAmount -= winnings;
            winLossAmount += bet.betAmount;

            // add to each player's transaction
            await db.transaction.create(
              {
                userId: bet.userId,
                betId: bet.id,
                betlineId: betlineId,
                type: "Bet",
                amount: winnings,
                description: `Won bet (ref no. #${bet.userId.slice(9, 13)}-${
                  bet.id
                }) on betline (ref no. #${bet.userId.slice(-5)}-${betline.id})`,
              },
              { transaction: t }
            );
          }
        });

        await Promise.all(arr);

        // reduce bet line owner wallet onHold by holdingAmount
        await db.wallet.decrement(
          "onHold",
          {
            by: betline.holdingAmount,
            where: {
              userId: betline.userId,
            },
          },
          { transaction: t }
        );

        // increase owner wallet balance by holdingAmount + constant
        await db.wallet.increment(
          "balance",
          {
            by: betline.holdingAmount + winLossAmount,
            where: {
              userId: betline.userId,
            },
          },
          { transaction: t }
        );

        // update betline winLoss by constant
        // update betline status to winner
        await this.betlineModel.update(
          { winLoss: winLossAmount, betStatus: winner },
          {
            where: {
              id: betlineId,
            },
          },
          { transaction: t }
        );

        // add to betline owners's transaction
        await db.transaction.create(
          {
            userId: betline.userId,
            betlineId: betlineId,
            type: "Betline",
            amount: `${
              winner === "house"
                ? betline.holdingAmount + winLossAmount
                : winLossAmount
            }`,
            description: `${
              winner === "house" ? "Won" : "Lost"
            } betline (ref no. #${betline.userId.slice(-5)}-${betlineId})`,
          },
          { transaction: t }
        );

        // return something
        return;
      });
      res.json(transaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
