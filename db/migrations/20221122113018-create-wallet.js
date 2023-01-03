"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.createTable("wallets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      on_hold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "users",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("wallets");
  },
};
