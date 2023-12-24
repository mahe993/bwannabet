"use strict";
const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable("betlines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bet_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      bet_description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      bet_odds: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      min_bet: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      max_bet: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      holding_amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      closing_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      bet_status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "open",
      },
      win_loss: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("betlines");
  },
};
