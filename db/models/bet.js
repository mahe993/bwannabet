"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Bet extends Model {
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
  Bet.init(
    {
      betAmount: DataTypes.INTEGER,
      betType: {
        type: DataTypes.STRING,
        defaultValue: "player",
        allowNull: false,
        validate: {
          isIn: {
            args: [["player", "house"]],
            msg: "Bet type must be either player or house",
          },
        },
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      betlineId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "betlines",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "bet",
      underscored: true,
    }
  );
  return Bet;
};
