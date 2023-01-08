"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.betline);
    }
  }
  transaction.init(
    {
      userId: {
        type: DataTypes.STRING,
        references: {
          model: "users",
          key: "id",
        },
      },
      betId: {
        type: DataTypes.STRING,
      },
      betlineId: {
        type: DataTypes.INTEGER,
        references: {
          model: "betlines",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.FLOAT,
      },
      balance: {
        type: DataTypes.FLOAT,
      },
      type: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["Deposit", "Withdrawal", "Bet Won", "Bet Lost"]],
            msg: "Type must be deposit, withdrawl, bet won or bet lost",
          },
        },
      },
      betAmount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "transaction",
      underscored: true,
    }
  );
  return transaction;
};
