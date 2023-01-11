export default class TransactionsController {
  constructor(transactionModel) {
    this.transactionModel = transactionModel;
  }

  // get all user's transactions
  async getUserTransactions(req, res) {
    try {
      const { userId } = req.params;

      const transactions = await this.transactionModel.findAll({
        where: {
          userId: userId,
        },
        order: [["createdAt", "DESC"]],
      });

      res.json(transactions);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
