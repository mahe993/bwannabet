"use strict";
/** @type {import('sequelize-cli').Migration} */

// using non ES6 syntax. ensure file extension is changed to .cjs

module.exports = {
  async up(queryInterface, Sequelize) {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tests", null, {});
  },
};
