import Sequelize from "sequelize";

export default class FriendsController {
  constructor(friendModel) {
    this.friendModel = friendModel;
  }

  // get all friend connections regardless of status
  async getFriends(req, res) {
    const { userId } = req.params;
    try {
      const output = await this.friendModel.findAll({
        where: {
          [Sequelize.Op.or]: [{ requestee: userId }, { requestor: userId }],
        },
      });

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
        return innerAcc;
      }, {});

      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}
