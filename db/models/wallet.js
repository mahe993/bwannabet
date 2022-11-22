"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
    }
  }
  wallet.init(
    {
      onHold: {
        type: DataTypes.INTEGER,
        validate: {
          checkBalance(value) {
            if (value < 0) {
              throw new Error("On hold cannot be negative!");
            }
          },
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        validate: {
          checkBalance(value) {
            if (value < 0) {
              throw new Error("Balance cannot be negative!");
            }
          },
        },
      },
      userId: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "wallet",
      underscored: true,
    }
  );
  return wallet;
};
