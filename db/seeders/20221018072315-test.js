"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

// using non ES6 syntax. ensure file extension is changed to .cjs

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "tests",
      [
        {
          test: "test",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("tests", null, {});
  },
};
