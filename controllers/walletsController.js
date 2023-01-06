import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config/firebase.js";
import db from "../db/models/index.js";
import { Op } from "sequelize";

export default class WalletsController {
  constructor(walletModel) {
    this.walletModel = walletModel;
  }

  // find or create specific wallet
  async getWallet(req, res) {
    const { userId } = req.params;
    try {
      const [user, created] = await this.walletModel.findOrCreate({
        where: { id: userId },
        defaults: { email: email },
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // retrieve all orders for specific userID
  async getAllOrders(req, res) {
    const { userId } = req.params;
    console.log("tried");
    try {
      const allOrders = await this.model.findAll({
        where: {
          userId: userId,
        },
        include: [
          {
            model: this.order_detailModel,
            include: [
              this.fabricModel,
              this.cuffModel,
              this.collarModel,
              this.backModel,
              this.frontModel,
              this.pocketModel,
              this.measurementModel,
            ],
          },
          // { model: this.measurementModel },
        ],
      });
      return res.json(allOrders);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async editBack(req, res) {
    const { backId } = req.params;
    try {
      const back = await this.model.findByPk(backId);
      return res.json(back);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // Retrieve specific user
  async getOne(req, res) {
    const { userId } = req.params;
    try {
      const user = await this.model.findByPk(userId);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
