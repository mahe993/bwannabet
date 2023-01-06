"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "transactions",
      [
        {
          user_id: "auth0%7C63b1977b057a048253326ae8",
          bet_id: null,
          betline_id: null,
          topup_amount: 100,
          type: "Deposit",
          bet_amount: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: "auth0%7C63b1977b057a048253326ae8",
          bet_id: "123",
          betline_id: "321",
          topup_amount: null,
          type: "Bet won",
          bet_amount: 300,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("transactions", null, {});
  },
};
