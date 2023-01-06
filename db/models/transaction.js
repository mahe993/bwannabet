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
        type: DataTypes.STRING,
      },
      topupAmount: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.STRING,
      },
      betAmount: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "wallet",
      underscored: true,
    }
  );
  return transaction;
};
