"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Betline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.hasMany(models.bet);
    }
  }

  Betline.init(
    {
      betType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      betDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      betOdds: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          checkBalance(value) {
            if (value < 1.1) {
              throw new Error("bet odds cannot be less than 1.1!");
            }
          },
        },
      },
      minBet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          checkBalance(value) {
            if (value < 1) {
              throw new Error("min bet cannot be less than 1!");
            }
          },
        },
      },
      maxBet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          checkBalance(value) {
            if (value < 1) {
              throw new Error("max bet cannot be less than 1!");
            }
          },
        },
      },
      holdingAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      closingTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      betStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "open",
        validate: {
          isIn: {
            args: [["open", "closed", "house", "player"]],
            msg: "Status must be open, closed, house or player!",
          },
        },
      },
      winLoss: {
        type: DataTypes.FLOAT,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "betline",
      underscored: true,
    }
  );
  return Betline;
};
