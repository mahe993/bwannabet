"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.createTable("friends", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestee: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requestor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "pending",
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

    // lock requestee/requestor combination
    await queryInterface.addIndex(
      "friends",
      [Sequelize.col("requestee"), Sequelize.col("requestor")],
      {
        unique: true,
        name: "requesteeRequestor_unique",
      }
    );

    // lock requestee/requestor reverse combination
    await queryInterface.addIndex(
      "friends",
      [Sequelize.col("requestor"), Sequelize.col("requestee")],
      {
        unique: true,
        name: "requestorRequestee_unique",
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable("friends");
  },
};
