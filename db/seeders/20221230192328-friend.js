"use strict";
import { Sequelize } from "sequelize";
/** @type {import('sequelize-cli').Migration} */

export default {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "friends",
      [
        {
          requestee: "tester1",
          requestor: "auth0|63aea209ac231151d6a252f7",
          status: "Pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester2",
          requestor: "auth0|63aea209ac231151d6a252f7",
          status: "Accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "tester3",
          requestor: "auth0|63aea209ac231151d6a252f7",
          status: "Accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "a1b2c3d4e5",
          status: "Pending",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          requestee: "auth0|63aea209ac231151d6a252f7",
          requestor: "f1g2h3i4j5",
          status: "Accepted",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("friends", null, {});
  },
};
