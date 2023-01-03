import Sequelize from "sequelize";
import db from "../db/models/index.js";

export default class FriendsController {
  constructor(friendModel) {
    this.friendModel = friendModel;
  }

  // send friend request
  async sendFriendRequest(req, res) {
    const { requestee, requestor } = req.body;
    try {
      const create = await this.friendModel.create({
        requestee: requestee,
        requestor: requestor,
      });
      res.json({ msg: "success" });
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // accept friend request
  async acceptFriend(req, res) {
    const { requestee, requestor } = req.body;
    try {
      const update = await this.friendModel.update(
        { status: "accepted" },
        { where: { requestee, requestor } }
      );
      if (update[0] === 1) {
        res.json({ msg: "success" });
      } else {
        res.status(404).json({
          error: true,
          msg: "Either no rows updated or more than 1 has been updated!",
        });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  // delete friend connection
  async deleteFriend(req, res) {
    const { status, requestee, requestor } = req.body;
    try {
      const numDeletedRows = await this.friendModel.destroy({
        where: { status, requestee, requestor },
      });
      if (numDeletedRows === 1) {
        res.json({ msg: "success" });
      } else {
        res.status(404).json({
          error: true,
          msg: "Either no rows deleted or more than 1 has been deleted!",
        });
      }
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
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
      if (result["pending"]) {
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

          return innerAcc;
        }, {});
      }

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
