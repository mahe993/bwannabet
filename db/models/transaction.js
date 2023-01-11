"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init(
    {
      amount: { type: DataTypes.FLOAT, allowNull: false },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: {
            args: [["Top Up", "Withdrawal", "Bet", "Betline"]],
            msg: "Type must be deposit, withdrawl, bet or betline",
          },
        },
      },
      description: { type: DataTypes.TEXT, allowNull: false },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      betId: {
        type: DataTypes.INTEGER,
      },
      betlineId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "transaction",
      underscored: true,
    }
  );
  return Transaction;
};
