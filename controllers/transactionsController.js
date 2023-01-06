import db from "../db/models/index.js";
import { Op } from "sequelize";

export default class TransactionsController {
  constructor(transactionModel) {
    this.transactionModel = transactionModel;
  }

  // get all transactions of a user based on userId
  async getTransaction(req, res) {
    const { userId } = req.params;

    try {
      const transactions = await this.transactionModel.findAll({
        where: {
          userId: userId,
        },
      });
      return res.json(transactions);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  //post any transactions
  async postTransaction(req, res) {
    const { userId, betId, betlineId, betAmount, type, topupAmount } = req.body;

    try {
      const newTransaction = await this.transactionModel.create({
        userId: userId,
        betId: betId,
        betlineId: betlineId,
        betAmount: betAmount,
        type: type,
        topupAmount: topupAmount,
      });

      return res.json(newTransaction);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
