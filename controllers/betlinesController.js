import Sequelize from "sequelize";
import db from "../db/models/index.js";

export default class BetlinesController {
  constructor(betlineModel) {
    this.betlineModel = betlineModel;
  }

  // create new betline
  async createBetline(req, res) {
    try {
      const { userId } = req.params;
      const betline = await this.betlineModel.create({
        ...req.body,
        userId: userId,
      });
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
        where: {
          userId: userId,
        },
      });
      res.json(betlines);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
