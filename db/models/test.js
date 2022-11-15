"use strict";
// ensure using import and not require
import { Model } from "sequelize";

// ensure using export default and not module.exports
export default (sequelize, DataTypes) => {
  // ensure class name is PascalCase
  class Booking extends Model {
    static associate(models) {
      // define association here
    }
  }
  // ensure class name is PascalCase
  Booking.init(
    {
      test: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "test",
      underscored: true,
    }
  );

  // ensure class name is PascalCase
  return Booking;
};
