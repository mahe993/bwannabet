"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.wallet);
      this.hasMany(models.betline);
      this.hasMany(models.transaction);
    }
  }
  User.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true },
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      profilePicture: DataTypes.JSONB,
      contactNumber: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
      underscored: true,
    }
  );
  return User;
};
