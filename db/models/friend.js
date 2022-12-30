"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  friend.init(
    {
      requestee: DataTypes.STRING,
      requestor: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        validate: {
          isIn: {
            args: [["pending", "accepted", "rejected"]],
            msg: "Status must be Pending, Accepted, or Rejected",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "friend",
      underscored: true,
    }
  );
  return friend;
};
