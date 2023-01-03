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
      requestee: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "requesteeRequestor",
      },
      requestor: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "requesteeRequestor",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: {
            args: [["pending", "accepted"]],
            msg: "Status must be Pending or Accepted",
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
