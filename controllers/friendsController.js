import Sequelize from "sequelize";
import db from "../db/models/index.js";

export default class FriendsController {
  constructor(friendModel) {
    this.friendModel = friendModel;
  }

  // get all friend connections regardless of status
  async getFriends(req, res) {
    const { userId } = req.params;
    try {
      const connections = await this.friendModel.findAll({
        where: {
          [Sequelize.Op.or]: [{ requestee: userId }, { requestor: userId }],
        },
      });

      // get the user details of the friend
      const outputPromisesArr = connections.map(async (connection) => {
        let friendId;
        if (connection.requestee === userId) {
          friendId = connection.requestor;
        } else {
          friendId = connection.requestee;
        }
        const friendDetails = await db.user.findByPk(friendId);
        return { ...connection.dataValues, ...friendDetails.dataValues };
      });
      const output = await Promise.all(outputPromisesArr);

      // mutate output to be an object seperated by status keys
      const result = output.reduce((acc, curr) => {
        if (acc[curr.status]) {
          acc[curr.status].push(curr);
        } else {
          acc[curr.status] = [curr];
        }
        return acc;
      }, {});

      // further mutate such that the Pending key holds values further seperated by requestee/requestor
      result.pending = result.pending.reduce((innerAcc, innerCurr) => {
        if (innerCurr.requestee === userId) {
          if (innerAcc.requestee) {
            innerAcc.requestee.push(innerCurr);
          } else {
            innerAcc.requestee = [innerCurr];
          }
        } else {
          if (innerAcc.requestor) {
            innerAcc.requestor.push(innerCurr);
          } else {
            innerAcc.requestor = [innerCurr];
          }
        }
        ``;
        return innerAcc;
      }, {});

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
