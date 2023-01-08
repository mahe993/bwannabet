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
            if (value < 0) {
              throw new Error("max bet cannot be negative!");
            }
          },
        },
      },
      closingTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      verificationTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      betStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "open",
        validate: {
          isIn: {
            args: [["open", "closed", "verified"]],
            msg: "Status must be open, closed or verified",
          },
        },
      },
      winner: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "open",
        validate: {
          isIn: {
            args: [["open", "player", "house"]],
            msg: "Status must be open, player or house",
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
