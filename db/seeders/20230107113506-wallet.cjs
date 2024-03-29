"use strict";
const { Sequelize } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "wallets",
      [
        {
          on_hold: 4535,
          balance: 8000,
          user_id: "auth0|63aea209ac231151d6a252f7",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          on_hold: 4535,
          balance: 8000,
          user_id: "auth0|63b1977b057a048253326ae8",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          on_hold: 4535,
          balance: 8000,
          user_id: "auth0|63b41dde057a04825332750b",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("wallets", null, {});
  },
};
